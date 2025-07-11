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
  const { orderDetails } = location.state || {};
  console.log(orderDetails, "order details");

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
  if (!orderDetails) {
    return <div>No order details found</div>;
  }

  const {
    id: orderId,
    totalPrice,
    paymentDetails,
    items,
    subTotal,
    deliveryCharges,
    tax,
    totalSavings,
    deliverySlot,
  } = orderDetails;

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
              <span className="value">{orderDetails?.order_id || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Customer Name:</span>
              <span className="value">{orderDetails?.customer_name || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Total Items:</span>
              <span className="value">{orderDetails?.total_items || 0}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className="value">{orderDetails?.status || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Packed By:</span>
              <span className="value">{orderDetails?.packed_by || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Packed At:</span>
              <span className="value">{orderDetails?.packed_at || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Created At:</span>
              <span className="value">{orderDetails?.created_at || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="label">Photo:</span>
              {orderDetails?.photo ? (
                <img src={orderDetails.photo} alt="Order Photo" style={{ maxWidth: 100, maxHeight: 100 }} />
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
              
                // <Container style={{marginBottom:'10px'}} key={index}>
                  <div  key={index} className="product-card">
                    <img src={item.productImage}  alt="product" height={60} width={55}></img>
                    <div
      style={{
        width: "1px", // Width of the line
        height: "110px", // Height of the line
        backgroundColor: "gray", // Line color
        margin: "0 auto", // Optional: Center the line horizontally
      }}
    ></div>

                    <div className="details">
                      <div className="info-row">
                        <span className="label">Name:</span>
                        <span className="value">{item.productName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Quantity:</span>
                        <span className="value">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Price:</span>
                        <span className="value">₹{item.price}</span>
                      </div>
                    </div>
                  </div>
                // </Container>
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
                  <strong>₹{subTotal}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Shipping Charges:</span>
                  <strong>₹{deliveryCharges}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Tax:</span>
                  <strong>₹{tax}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Total Savings:</span>
                  <strong>₹{totalSavings}</strong>
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
                <span>₹{totalPrice}</span>
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

export default StartOrder;

