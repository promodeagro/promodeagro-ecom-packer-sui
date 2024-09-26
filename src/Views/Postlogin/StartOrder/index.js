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
  StatusIndicator,
  Grid,
  ColumnLayout,
  Badge,
  Icon,
} from "@cloudscape-design/components";

import { useNavigate, useParams } from "react-router-dom";

const Customers = () => {
  const { orderId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  // State to store order details
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch order details from API
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/OrderDetails/${orderId}`
        ); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // State management for camera and modal
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);
  const [hideUI, setHideUI] = useState(false); // State to hide UI
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    // Fetch order details from API
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/OrderDetails/${orderId}`
        ); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderDetails) {
    return <div>No order details found</div>;
  }
  // Open camera
  const openCamera = async () => {
    setHideUI(true);
    setIsCameraOpen(true);
  
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },  // Set ideal width
        height: { ideal: 720 },  // Set ideal height
      },
    });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };
  

  // Take photo and show modal
  // Take photo and show modal
  const takePhoto = () => {
    if (!canvasRef.current) return;
  
    // Set canvas dimensions to match the video dimensions
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
  
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
  
    const dataURL = canvasRef.current.toDataURL("image/png");
    setPhoto(dataURL);
    setIsCameraOpen(false);
    setIsModalVisible(true);
  
    // Stop the video stream after taking the photo
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  };
  

  // Function to upload the photo to the API
  const uploadPhoto = async (photo) => {
    try {
      const response = await fetch(
        `https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/orders/${orderId}/upload-photo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: photo }), // Send the photo in the request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }

      const responseData = await response.json(); // Parse the response body as JSON
      console.log("Photo uploaded successfully:", responseData); // Log the response data
    } catch (error) {
      console.error("Error uploading photo:", error.message);
    }
    setIsModalVisible(false);
    console.log("Confirmed");
  };

  // Retake photo
  const retakePhoto = () => {
    setIsModalVisible(false); // Hide the success modal
    setPhoto(null);
    openCamera();
  };

  // PUT API call to complete packing the order
  const putCompletePackedOrder = async () => {
    try {
      const response = await fetch(
        `https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/orders/${orderId}/CompletePacked`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Status: "Packed" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to complete packing the order");
      }
      const data = await response.json();
      console.log("Order status updated successfully:", data);
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  // Submit photo and navigate to Pack Order page
  const submitpackedorder = () => {
    setSubmittedImage(photo);
    setPhoto(null);
    setHideUI(false); // Show the UI back after submitting the photo
    putCompletePackedOrder();

    // Navigate to Pack Order page with submittedImage state
    navigate("/app/Orders", { state: { image: photo } });
  };
  const { CustomerName, Payment, Price, ItemsList, CostDetails, items } =
    orderDetails;
  console.log(orderDetails, "specific");
  console.log(photo, "photo");

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
                { text: "Started Order", href: "/app/customers" },
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
           
              <Box variant="h2" margin={{bottom:"l",top:"xs"}}>
            <span className="header_underline">Started Order</span>
            </Box>
         
          </div>

          <div className="details">
            <div className="info-row">
              <span className="value">Order ID :</span>
              <span className="value">{orderId?.slice(-7)}</span>
            </div>
            <div className="info-row">
              <span className="label">Customer Name :</span>
              <span className="value">{CustomerName}</span>
            </div>
            <div className="info-row">
              <span className="label">Payment :</span>
              <span className="value">{Payment.method}</span>
            </div>
            <div className="info-row">
              <span className="label">Price :</span>
              <span className="value">₹{Price}</span>
            </div>
            <div className="items-list">
              <span className="items-label">
                Items list <span className="items-count">({items} Items)</span>
              </span>
              {/* <button className="unpacked-btn"> */}
              <Badge> Unpacked Order</Badge>
              {/* </button> */}
            </div>
          </div>
          <hr />

           {/* Items Display */}
      <div className="items-container">
        {ItemsList.map((item, index) => (
          <div style={{marginBottom:"10px"}}>
          <Container>
          <div key={index} className="product-card">
      
            <div className="image-container">
              <img
                src={item.Images
                }
                alt={item.Name}
                className="product-image"
              />
            </div>
            <div className="details">
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">{item.Name}</span>
              </div>
              <div className="info-row">
                <span className="label">Quantity:</span>
                <span className="value">{item.Quantity}</span>
              </div>
              <div className="info-row">
                <span className="label">Price:</span>
                <span className="value">₹{item.Price}</span>
              </div>
            </div>
            </div>
            </Container>
            </div>
        ))}
      </div>

          {/* Cost Details Section */}
          <h3>Cost Details</h3>
          <SpaceBetween direction="vertical" size="l">
            <Container>
              <SpaceBetween direction="vertical" size="xxs">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Sub Total :</span>
                  <strong>₹{CostDetails.SubTotal}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Shipping Charges :</span>
                  <strong>₹{CostDetails.ShippingCharges}</strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Gross Amount :</span>
                  <strong>₹{CostDetails.GrossDetails}</strong>
                </div>
              </SpaceBetween>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <span>Total Amount :</span>
                <span>₹{CostDetails.TotalAmount}</span>
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
  style={{ height: "85vh", objectFit: "contain" }}  // Preserve aspect ratio
/>

    <canvas
      ref={canvasRef}
      width="100%"
      height="85vh"
      style={{ display: "none" }}
    />
    <Box textAlign="center" position="absolute" bottom="20px" width="100%">
      <Button variant="inline-link" onClick={takePhoto}>
        Take Photo
      </Button>
    </Box>
  </div>
)}
      

      {/* Photo Preview and Modal */}
      {photo && (
        <div style={{ position: "relative" }}>
          <img
            src={photo}
            alt="Preview"
            style={{ width: "100%", height: "80vh",objectFit:"cover" }}
          />
          <div style={{ textAlign: "center" }}>
            {/* <Button variant="link" onClick={retakePhoto}>
            Retake Photo
          </Button> */}
            <Button variant="primary" onClick={submitpackedorder}>
              Complete Pack Order
            </Button>
          </div>

          {/* Modal - Display success message */}

          <Modal
            visible={isModalVisible}
            size="small"
            onDismiss={() => setIsModalVisible(false)}
            closeAriaLabel="Close modal"
            footer={
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="inline-link" onClick={retakePhoto}>
                  Retake
                </Button>
                <Button variant="primary" onClick={() => uploadPhoto(photo)}>
                  Confirm
                </Button>
              </div>
            }
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

export default Customers;

