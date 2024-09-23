import React, { useState, useRef } from "react";
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
import potatoImg from "../../../Assets/Images/Tomato.jpg";
import tomatoImg from "../../../Assets/Images/Tomato.jpg";
import carrotImg from "../../../Assets/Images/Tomato.jpg";
import cucumberImg from "../../../Assets/Images/Tomato.jpg";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate(); // Initialize navigate
  const items = [
    {
      name: "Potato",
      quantity: "05 Kgs",
      price: "Rs. 250",
      image: potatoImg,
    },
    {
      name: "Tomato",
      quantity: "500 Grams",
      price: "Rs. 250",
      image: tomatoImg,
    },
    {
      name: "Carrot",
      quantity: "05 Pieces",
      price: "Rs. 250",
      image: carrotImg,
    },
    {
      name: "Cucumber",
      quantity: "05 Kgs",
      price: "Rs. 250",
      image: cucumberImg,
    },
    // Add more items as needed
  ];

  // State management for camera and modal
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [submittedImage, setSubmittedImage] = useState(null);
  const [hideUI, setHideUI] = useState(false); // State to hide UI
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

  return (
    <ContentLayout
      disableOverlap
      headerVariant="high-contrast"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Home", href: "/app/dashboard" },
            { text: "Packed Orders", href: "/app/customers" },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
     
        {/* Conditionally render the main UI only if hideUI is false */}
        {!hideUI && (
          <>
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
        <span className="value">54764</span>
      </div>
      <div className="info-row">
        <span className="label">Customer Name :</span>
        <span className="value">Maruti S</span>
      </div>
      <div className="info-row">
        <span className="label">Payment :</span>
        <span className="value">COD</span>
      </div>
      <div className="info-row">
        <span className="label">Price :</span>
        <span className="value">RS. 2980</span>
      </div>
      <div className="items-list">
        <span className="items-label">Items list <span className="items-count">(16 Items)</span></span>
        {/* <button className="unpacked-btn"> */}
          <Badge>  Unpacked Order
          </Badge>
          {/* </button> */}
      </div>
    </div>
              <hr />

              {/* Items Display */}
              <div className="items-container">
              {items.map((item, index) => (
         <div className="product-card">
         <div className="image-container">
           <img
             src={item.image} // Replace with actual image link
             alt="Potato"
             className="product-image"
           />
         </div>
         <div className="product-details">
           <div className="detail-row">
             <span className="label-prod">Name :</span>
             <span className="value-prod">Potato</span>
           </div>
           <div className="detail-row">
             <span className="label-prod">Quantity :</span>
             <span className="value-prod">05 Kgs</span>
           </div>
           <div className="detail-row">
             <span className="label-prod">Price :</span>
             <span className="value-prod">Rs. 250</span>
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
                  <strong>RS. 2980</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping Charges :</span>
                  <strong>RS. 80</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Gross Amount :</span>
                  <strong>RS. 2980</strong>
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
                <span>RS. 2980</span>
              </div>
            </Container>

            {/* Pack Order Button */}
        
              <Button variant="primary" fullWidth style={{ width: "100%" }} onClick={openCamera}>
                Pack Order
              </Button>
              </SpaceBetween>
    
          </>
        )}

        {/* Camera and Photo Handling */}
        {isCameraOpen && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div>
              <video ref={videoRef} width="100%" height="100%"  />
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
            <h4>Photo Preview:</h4>
            <img src={photo} alt="Preview" style={{ width: "100%", height: "100%" }} />
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

    </ContentLayout>
  );
};

export default Customers;
