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
  Spinner,
} from "@cloudscape-design/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetailsById } from "Redux-Store/PackedOrders/PackedOrderThunk"; // Import the thunk

import { useNavigate, useParams } from "react-router-dom";

const StartOrder = () => {


  // State management for camera and modal
  const [isUploading, setIsUploading] = useState(false); // State to show the spinner during upload
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);
  const [hideUI, setHideUI] = useState(false); // State to hide UI
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { orderId } = useParams();
  const navigate = useNavigate();

  // State to store order details
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order details from API
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/OrderDetails/${orderId}`); // Replace with your actual API URL
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

  const { CustomerName, Payment, Price, ItemsList, CostDetails,items } = orderDetails;
  console.log(orderDetails,"specific");
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
  

// Function to take photo, compress it, and show modal
const takePhoto = () => {
  if (!canvasRef.current) return;

  // Get video dimensions
  const videoWidth = videoRef.current.videoWidth;
  const videoHeight = videoRef.current.videoHeight;

  // Set the canvas size to a smaller size for compression (reduce dimensions)
  const targetWidth = 800;  // Example compressed width
  const scaleFactor = targetWidth / videoWidth;
  const targetHeight = videoHeight * scaleFactor;  // Maintain aspect ratio

  canvasRef.current.width = targetWidth;
  canvasRef.current.height = targetHeight;

  const context = canvasRef.current.getContext("2d");
  context.drawImage(videoRef.current, 0, 0, targetWidth, targetHeight);

  // Convert the canvas to a compressed base64 image (JPEG with quality of 0.7)
  const compressedDataURL = canvasRef.current.toDataURL("image/jpeg", 0.7);  // 70% quality
  setPhoto(compressedDataURL);  // Save the photo
  setIsCameraOpen(false);  // Close the camera
  uploadPhoto(compressedDataURL);  // Upload the compressed photo

  // Stop the video stream after taking the photo
  videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
};

 // Function to upload the photo to the API
 const uploadPhoto = async (photo) => {
  setIsUploading(true); // Show the spinner
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

    const responseData = await response.json();
    console.log("Photo uploaded successfully:", responseData);
    setIsModalVisible(true);
      // Automatically close the modal after 2 seconds
      setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);
  } catch (error) {
    console.error("Error uploading photo:", error.message);
  } finally {
    setIsUploading(false); // Hide the spinner after the upload completes
  }
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
    navigate("/app/PackedOrders", { state: { image: photo } });
  };

 

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
    <Box margin={"xs"} textAlign="center" position="absolute" bottom="20px" width="100%">
      <Button variant="inline-link" onClick={takePhoto}>
        Take Photo
      </Button>
    
    </Box>
    <Box  textAlign="center" position="absolute" bottom="20px" width="100%">
     
      <Button disabled={true} variant="primary" onClick={submitpackedorder}>
              Complete Pack Order
            </Button>
    </Box>
  </div>
)}
      

      {photo && (
        <div style={{ position: "relative" }}>
          <img src={photo} alt="Preview" style={{ width: "100%", height: "80vh", objectFit: "cover" }} />
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
           </div>// Show spinner when uploading
            ) : (
              <Button variant="primary" onClick={submitpackedorder}>
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

