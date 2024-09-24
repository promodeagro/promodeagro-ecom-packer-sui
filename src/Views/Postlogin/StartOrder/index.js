import React, { useState, useRef,useEffect } from "react";
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

import { useNavigate,useParams } from "react-router-dom";

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
          const response = await fetch(`https://7fy0psdjel.execute-api.us-east-1.amazonaws.com/dev/OrderDetails/${orderId}`); // Replace with your actual API URL
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
        const response = await fetch(`https://7fy0psdjel.execute-api.us-east-1.amazonaws.com/dev/OrderDetails/${orderId}`); // Replace with your actual API URL
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
    setHideUI(true); // Hide the rest of the UI
    setIsCameraOpen(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  // Take photo and show modal
  const takePhoto = () => {
    if (!canvasRef.current) return; // Ensure the canvas is rendered

    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataURL = canvasRef.current.toDataURL("image/png");
    setPhoto(dataURL);
    setIsCameraOpen(false);
    setIsModalVisible(true); // Show success modal
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop the video stream
  };

  // Retake photo
  const retakePhoto = () => {
    setPhoto(null);
    openCamera();
  };

  // Submit photo and navigate to Pack Order page
  const submitPhoto = () => {
    setSubmittedImage(photo);
    setPhoto(null);
    setHideUI(false); // Show the UI back after submitting the photo
    setIsModalVisible(false); // Close modal

    // Navigate to Pack Order page with submittedImage state
    navigate("/app/Orders", { state: { image: photo } });
  };
  const { CustomerName, Payment, Price, ItemsList, CostDetails,items } = orderDetails;
  console.log(orderDetails,"specific");

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
            { text: "Packed Orders", href: "/app/customers" },
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
              <h3 className="header_underline1">Started Order</h3>
            </div>

            <div className="order-details">
      <div className="info-row">
        <span className="value">Order ID :</span>
        <span className="value">{orderId}</span>
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
          <Badge>  Unpacked Order
          </Badge>
          {/* </button> */}
      </div>
    </div>
              <hr />

              {/* Items Display */}
              <div className="items-container">
              {ItemsList.map((item, index) => (
                <div key={index} className="product-card">
                <div className="image-container">
                  <img
                    src={item.Images
                    }
                    alt={item.Name}
                    className="product-image"
                  />
                </div>
         <div className="product-details">
           <div className="detail-row">
             <span className="label-prod">Name :</span>
             <span className="value-prod">{item.Name}</span>
           </div>
           <div className="detail-row">
             <span className="label-prod">Quantity :</span>
             <span className="value-prod">{item.Quantity}</span>
           </div>
           <div className="detail-row">
                <span className="label-prod">Price :</span>
                <span className="value-prod">₹{item.Price}</span>
              </div>
         </div>
       </div>
              ))}
              </div>
       

            {/* Cost Details Section */}
            <h3>Cost Details</h3>
            <SpaceBetween direction="vertical" size="l">
            <Container>
              <SpaceBetween direction="vertical" size="xxs">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sub Total :</span>
                  <strong>₹{CostDetails.SubTotal}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping Charges :</span>
                  <strong>₹{CostDetails.ShippingCharges}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  alignItems:"center",
                  alignContent:"center"
                }}
              >
                <span>Total Amount :</span>
                <span>₹{CostDetails.TotalAmount}</span>
              </div>
            </Container>

            {/* Pack Order Button */}
        
              <Button variant="primary" fullWidth style={{ width: "100%" }} onClick={openCamera}>
                Pack Order
              </Button>
              </SpaceBetween>
    
   
    

       

    </ContentLayout>
  )}
     {/* Camera and Photo Handling */}
     {isCameraOpen && (
      <div>
        <div>
          <video ref={videoRef} width="100%" style={{height:"92"}}  />
          <canvas ref={canvasRef} width="100%" height="100%" style={{ display: 'none' }} /> {/* Hidden Canvas */}
          <Box textAlign="center">
            <Button variant="inline-link" onClick={takePhoto}>
              Take Photo
            </Button>
          </Box>
        </div>
      </div>
    )}

    {/* Photo Preview and Modal */}
    {photo && (
      <div style={{ position: "relative" }}>
      
        <img src={photo} alt="Preview" style={{ width: "100%", height: "90vh" }} />
        <div style={{textAlign:"center"}}>
          <Button variant="link" onClick={retakePhoto}>
            Retake Photo
          </Button>
          <Button variant="primary" onClick={submitPhoto}>
            Complete Pack Order
          </Button>
        </div>

        {/* Modal - Display success message */}
        <Modal
          size="small"
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          closeAriaLabel="Close modal"
          // header="Success"
        >
          <div style={{color:"green",textAlign:"center"}}>
            <Icon name="status-positive" size="big"></Icon>
          {/* <StatusIndicator type="success"></StatusIndicator> */}
            <h4>
          Successfully
          </h4>
       
          </div>
        </Modal>
      </div>
    )}
    </>
  );
};

export default Customers;
