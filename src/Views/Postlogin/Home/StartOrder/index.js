import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Header,
  Button,
  Box,
  SpaceBetween,
  TextContent,
  ContentLayout,
  BreadcrumbGroup,
  Modal,
  Badge,
  Icon,
  Spinner,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const StartOrder = () => {
  const location = useLocation();
  const { orderDetails: navOrderDetails } = location.state || {};
  // State for order details
  const [orderDetails, setOrderDetails] = useState(navOrderDetails || null);
  const [loading, setLoading] = useState(!navOrderDetails);
  // State management for camera and modal
  const [isUploading, setIsUploading] = useState(false); // State to show the spinner during upload
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);
  const [hideUI, setHideUI] = useState(false); // State to hide UI
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Get order_id from navOrderDetails if present
  const navOrderId = navOrderDetails?.order_id;

  useEffect(() => {
    // Only fetch if we don't already have items and cost_details
    if (navOrderId && (!navOrderDetails?.items || !navOrderDetails?.cost_details)) {
      setLoading(true);
      fetch(`http://localhost:3000/dev/orders/start/${navOrderId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [navOrderId, navOrderDetails]);

  if (loading) return <div>Loading...</div>;
  if (!orderDetails) return <div>No order details found</div>;

  // Parse DynamoDB format if needed
  let parsedOrderDetails = orderDetails;
  if (orderDetails && (orderDetails.S || orderDetails.N || orderDetails.M || orderDetails.L)) {
    parsedOrderDetails = parseDynamoDB(orderDetails);
  }
  console.log("Original orderDetails:", orderDetails);
  console.log("Parsed orderDetails:", parsedOrderDetails);
  console.log("Items array:", parsedOrderDetails?.items);
  console.log("Cost fields:", {
    subTotal: parsedOrderDetails?.subTotal,
    deliveryCharges: parsedOrderDetails?.deliveryCharges,
    tax: parsedOrderDetails?.tax,
    totalSavings: parsedOrderDetails?.totalSavings,
    totalPrice: parsedOrderDetails?.totalPrice
  });

  // Open camera
  const openCamera = async () => {
    setHideUI(true);
    setIsCameraOpen(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1280 }, // Set ideal width
        height: { ideal: 720 }, // Set ideal height
      },
    });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

 // Capture photo
 const takePhoto = () => {
  if (!canvasRef.current || !videoRef.current) return;

  const context = canvasRef.current.getContext("2d");
  const videoWidth = videoRef.current.videoWidth;
  const videoHeight = videoRef.current.videoHeight;

  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;
  context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

  const imageData = canvasRef.current.toDataURL("image/jpeg", 0.7);
  setPhoto(imageData);

  // Stop camera
  if (videoRef.current.srcObject && typeof videoRef.current.srcObject.getTracks === 'function') {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  }
  setIsCameraOpen(false);
  setShowPhotoOptions(true);
};

const handleRetakePhoto = () => {
  setPhoto(null);
  setShowPhotoOptions(false);
  openCamera();
};

const handleCompleteOrder = () => {
  navigate("/app/Home/CompleteOrder", { state: { orderDetails, photo } });
};

// Upload photo to S3 and pack order
const submitPackedOrder = async () => {
  if (!photo || !orderDetails?.id) {
    console.error("Missing photo or order ID");
    return;
  }
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve and parse 'user' object from local storage
  // const jwtToken = user?.accessToken; 
  const token = user?.accessToken;


  // setIsUploading(true);
  // try {
  //   // Step 1: Get S3 upload URL
  //   const uploadResponse = await fetch(
  //     "https://bytud12spg.execute-api.ap-south-1.amazonaws.com/packer/6679942e-ab1e-4de1-8b1b-382a3ed9a044/uploadUrl",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `${token}`, // Replace with actual token if required
  //       },
  //     }
  //   );
  //   console.log(uploadResponse,"response");

  //   if (!uploadResponse.ok) {
  //     throw new Error("Failed to get upload URL");
  //   }

  //   const { uploadUrl } = await uploadResponse.json();
  //   console.log("S3 Upload URL:", uploadUrl);

  //   // Step 2: Upload image to S3
  //   const imageBlob = await fetch(photo).then((res) => res.blob());
  //   const s3UploadResponse = await fetch(uploadUrl, {
  //     method: "PUT",
  //     headers: { "Content-Type": "image/jpeg" },
  //     body: imageBlob,
  //   });

  //   if (!s3UploadResponse.ok) {
  //     throw new Error("Failed to upload image to S3");
  //   }

  //   console.log("Image uploaded successfully to S3");

    // Step 3: Pack the order
    const packOrderResponse = await fetch(
      `https://bytud12spg.execute-api.ap-south-1.amazonaws.com/packer/order/${orderDetails.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ action: "pack", image: "https://example.com/image.jpg" }),
      }
    );

    if (!packOrderResponse.ok) {
      const errorData = await packOrderResponse.json();
      throw new Error(errorData.message || "Failed to pack order");
    }

    const packOrderData = await packOrderResponse.json();
    console.log("Order Packed Successfully:", packOrderData);

    setIsModalVisible(true);
    setTimeout(() => {
      setIsModalVisible(false);
      navigate("/app/Home", { state: { image: photo } });
    }, 3000);
  }
  //  catch (error) {
  //   console.error("Error in submitting packed order:", error.message);
  // }
  //  finally {
  //   setIsUploading(false);
  // }
// };
  if (!parsedOrderDetails) {
    return <div>No order details found</div>;
  }

  const {
    id,
    totalPrice,
    paymentDetails,
    items,
    subTotal,
    deliveryCharges,
    tax,
    totalSavings,
    deliverySlot,
    order_id,
    customer_name,
    total_items,
    status,
    packed_by,
    packed_at,
    created_at,
    photo: orderPhoto,
    cost_details
  } = parsedOrderDetails;

  // Fallback calculation for cost details if not provided
  const calcSubTotal = Array.isArray(items) ? items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) : 0;
  const displaySubTotal = subTotal !== undefined && subTotal !== null
    ? subTotal
    : (cost_details?.sub_total !== undefined ? cost_details.sub_total : calcSubTotal);
  const displayDeliveryCharges = deliveryCharges !== undefined && deliveryCharges !== null
    ? deliveryCharges
    : (cost_details?.shipping_charges !== undefined ? cost_details.shipping_charges : 0);
  const displayTax = tax !== undefined && tax !== null
    ? tax
    : (cost_details?.tax !== undefined ? cost_details.tax : 0);
  const displayTotalSavings = totalSavings !== undefined && totalSavings !== null
    ? totalSavings
    : (cost_details?.total_savings !== undefined ? cost_details.total_savings : 0);
  const displayTotalPrice = totalPrice !== undefined && totalPrice !== null
    ? totalPrice
    : (cost_details?.total_amount !== undefined ? cost_details.total_amount : (displaySubTotal + displayDeliveryCharges + displayTax));

  return (
    <>
      {/* Conditionally render the main UI only if hideUI is false */}
      {!hideUI && (
        <ContentLayout
          defaultPadding
          disableOverlap
          headerVariant="high-contrast"
          breadcrumbs={
            <BreadcrumbGroup
              items={[
                { text: "Home", href: "/app/Home" },
                { text: "Started Order", href: "/app/StartOrder" },
              ]}
              ariaLabel="Breadcrumbs"
            />
          }
        >
          {/* Header Section */}
          <div style={{ display: "flex", gap: "3px" }}>
            <Button
              onClick={() => navigate(-1)}
              variant="icon"
              iconName="arrow-left"
            ></Button>
            <Box variant="h2" margin={{ bottom: "l", top: "xs" }}>
              <span className="header_underline">Started Order</span>
            </Box>
          </div>

          {/* Order Details */}
          <div className="details">
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">{order_id || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Customer Name:</span>
              <span className="value">{customer_name || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Total Items:</span>
              <span className="value">{total_items || (Array.isArray(items) ? items.length : 0)}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className="value">{status || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Packed By:</span>
              <span className="value">{packed_by || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Packed At:</span>
              <span className="value">{packed_at || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Created At:</span>
              <span className="value">{created_at || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Photo:</span>
              {orderPhoto ? (
                <img src={orderPhoto} alt="Order Photo" style={{ maxWidth: 100, maxHeight: 100 }} />
              ) : (
                <span className="value">N/A</span>
              )}
            </div>
          </div>
          <hr />

          {/* Items Display */}
          <div className="items-container">
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="product-card">
                  <img src={item.image || item.productImage} alt="product" height={60} width={55} />
                  <div
                    style={{
                      width: "1px",
                      height: "110px",
                      backgroundColor: "gray",
                      margin: "0 auto",
                    }}
                  ></div>
                  <div className="details">
                    <div className="info-row">
                      <span className="label">Name:</span>
                      <span className="value">{item.name || item.productName}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Quantity:</span>
                      <span className="value">
                        {item.quantity} {item.unit || ""}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="label">Price:</span>
                      <span className="value">₹{item.price}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No items found for this order.</div>
            )}
          </div>

          {/* Cost Details Section */}
          <h3>Cost Details</h3>
          <SpaceBetween direction="vertical" size="l">
            <Container>
              <SpaceBetween direction="vertical" size="xxs">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Sub Total:</span>
                  <strong>₹{displaySubTotal}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Shipping Charges:</span>
                  <strong>₹{displayDeliveryCharges}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Tax:</span>
                  <strong>₹{displayTax}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Total Savings:</span>
                  <strong>₹{displayTotalSavings}</strong>
                </div>
              </SpaceBetween>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Total Amount:</span>
                <span>₹{displayTotalPrice}</span>
              </div>
            </Container>

            {/* Pack Order Button */}
            <Button
              variant="primary"
              fullWidth
              style={{ width: "100%" }}
              onClick={openCamera}
            >
              Pack Order
            </Button>
          </SpaceBetween>
        </ContentLayout>
      )}
      {/* Camera and Photo Handling */}
      {isCameraOpen && (
        <div style={{ position: "relative", height: "82vh" }}>
          <video
            ref={videoRef}
            width="100%"
            style={{ height: "85vh", objectFit: "contain" }} // Preserve aspect ratio
          />

          <canvas
            ref={canvasRef}
            width="100%"
            height="85vh"
            style={{ display: "none" }}
          />
          <Box
            margin={{ bottom: "xs" }}
            textAlign="center"
            position="absolute"
            bottom="20px"
            width="100%"
          >
            <Button variant="inline-link" onClick={takePhoto}>
              Take Photo
            </Button>
          </Box>
          <Box
            textAlign="center"
            position="absolute"
            bottom="20px"
            width="100%"
          >
            <Button
              disabled={true}
              variant="primary"
              onClick={submitPackedOrder}
            >
              Complete Pack Order
            </Button>
          </Box>
        </div>
      )}

      {photo && showPhotoOptions && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <img
            src={photo}
            alt="Preview"
            style={{ width: "100%", maxWidth: 400, height: "auto", objectFit: "cover", marginBottom: 20 }}
          />
          <div>
            <Button variant="primary" onClick={handleCompleteOrder} style={{ marginRight: 10 }}>
              Complete Order
            </Button>
            <Button variant="normal" onClick={handleRetakePhoto}>
              Retake Photo
            </Button>
          </div>
        </div>
      )}

      {photo && (
        <div style={{ position: "relative" }}>
          <img
            src={photo}
            alt="Preview"
            style={{ width: "100%", height: "80vh", objectFit: "cover" }}
          />
          <div style={{ textAlign: "center" }}>
            {/* Show spinner if uploading */}
            {isUploading ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                }}
              >
                <Spinner size="large" />
              </div> // Show spinner when uploading
            ) : (
              <Button variant="primary" onClick={submitPackedOrder}>
                Complete Pack Order
              </Button>
            )}
          </div>

          {/* Modal - Display success message */}

          <Modal
            visible={isModalVisible}
            size="small"
            onDismiss={() => setIsModalVisible(false)}
            closeAriaLabel="Close modal"
          >
            <div style={{ color: "green", textAlign: "center" }}>
              <Icon name="status-positive" size="large" />
              <h4>Successfully</h4>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

// Utility to parse DynamoDB JSON to plain JS
function parseDynamoDB(item) {
  if (item === null || typeof item !== 'object') return item;
  if ('S' in item) return item.S;
  if ('N' in item) return Number(item.N);
  if ('BOOL' in item) return item.BOOL;
  if ('L' in item) return item.L.map(parseDynamoDB);
  if ('M' in item) {
    const obj = {};
    for (const key in item.M) {
      obj[key] = parseDynamoDB(item.M[key]);
    }
    return obj;
  }
  return item;
}

export default StartOrder;

