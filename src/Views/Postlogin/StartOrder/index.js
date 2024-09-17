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
      <SpaceBetween direction="vertical" size="xl">
        {/* Conditionally render the main UI only if hideUI is false */}
        {!hideUI && (
          <>
            {/* Header Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Button
                onClick={() => navigate(-1)}
                variant="icon"
                iconName="arrow-left"
              ></Button>
              <Header variant="h3">Started Order</Header>
            </div>

            <SpaceBetween size="xs">
              {/* Order Information */}
              <Box>
                <TextContent>Order ID: 54764</TextContent>
                <TextContent>Customer Name: Maruti S</TextContent>
                <TextContent>Payment: COD</TextContent>
                <TextContent>Price: Rs.2980</TextContent>
              </Box>

              {/* Items List Header */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Header variant="h4">Items list (16 Items)</Header>
                <p
                  style={{
                    backgroundColor: "#0972D3",
                    color: "white",
                    padding: "5px",
                    borderRadius: "4px",
                    width: "14rem",
                    textAlign: "center",
                  }}
                >
                  Unpacked Order
                </p>
              </div>
              <hr />

              {/* Items Display */}
              {items.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    border: "1px solid #e1e1e1",
                    borderRadius: "8px",
                    padding: "10px",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div>
                    <TextContent>Name: &nbsp;&nbsp;{item.name}</TextContent>
                    <TextContent>Quantity:&nbsp;&nbsp; {item.quantity}</TextContent>
                    <TextContent>Price:&nbsp;&nbsp; {item.price}</TextContent>
                  </div>
                </div>
              ))}
            </SpaceBetween>

            {/* Cost Details Section */}
            <h3>Cost Details</h3>
            <Container>
              <SpaceBetween direction="vertical" size="xxs">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sub Total :</span>
                  <span>RS. 2980</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping Charges :</span>
                  <span>RS. 80</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Gross Amount :</span>
                  <span>RS. 2980</span>
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
                <span>Total Amount :</span>
                <span>RS. 2980</span>
              </div>
            </Container>

            {/* Pack Order Button */}
            <Box textAlign="center">
              <Button variant="primary" style={{ width: "100%" }} onClick={openCamera}>
                Pack Order
              </Button>
            </Box>
          </>
        )}

        {/* Camera and Photo Handling */}
        {isCameraOpen && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div>
              <video ref={videoRef} width="100%" height="100%" />
              <canvas ref={canvasRef} width="100%" height="100%" style={{ display: 'none' }} /> {/* Hidden Canvas */}
              <Box textAlign="center">
                <Button variant="primary" onClick={takePhoto}>
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
            <Box textAlign="center">
              <Button variant="link" onClick={retakePhoto}>
                Retake Photo
              </Button>
              <Button variant="primary" onClick={submitPhoto}>
                Complete Pack Order
              </Button>
            </Box>

            {/* Modal - Display success message */}
            <Modal
              visible={isModalVisible}
              onDismiss={() => setIsModalVisible(false)}
              closeAriaLabel="Close modal"
              header="Success"
            >
              Successfully took image!
            </Modal>
          </div>
        )}
      </SpaceBetween>
    </ContentLayout>
  );
};

export default Customers;
