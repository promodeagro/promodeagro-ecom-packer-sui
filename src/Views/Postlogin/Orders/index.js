import React from "react";
import Header from "@cloudscape-design/components/header";
import ContentLayout from "@cloudscape-design/components/content-layout";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  Flashbar

} from "@cloudscape-design/components";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Products = () => {

  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation();
  const { image } = location.state || {};
    // State to control Flashbar visibility
    const [isFlashVisible, setIsFlashVisible] = useState(true);

    // Flashbar content for success message
    const flashbarItems = [
      {
        type: "success",
        content: "Order packed successfully!",
        dismissible: true,
        onDismiss: () => setIsFlashVisible(false), // Dismiss action
      },
    ];

  const orders = [
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "packed",
    },
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "Unpacked",
    },
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "Unpacked",
    },
  ];

  return (
    <>
      <ContentLayout
      
        headerVariant="high-contrast"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: "Home", href: "/app/dashboard" },
              // { text: "Packed Orders", href: "/app/dashboard/products" },
            ]}
            ariaLabel="Breadcrumbs"
          />
        }
      >
           {/* Display success Flashbar if image is available and Flashbar is visible */}
      {image && isFlashVisible && (
        <Box margin={{ bottom: "s" }}>
          <Flashbar items={flashbarItems} />
        </Box>
      )}
        <SpaceBetween direction="vertical" size="xl">
          <Header variant="h2">Today's Orders</Header>

          <div style={{ display: "flex", gap: "10px" }}>
          <div
              style={{
                width: "50%",
                backgroundColor: "#0972D3",
                borderRadius: "8px",
                paddingLeft: "30px",
                cursor: "pointer", // Change to pointer to show it's clickable
              }}
          
            >
              <h4 style={{ color: "white" }}> Packed Orders </h4>
              <h1 style={{ color: "white", fontWeight: "bolder" }}>25</h1>
            </div>

            <div
              style={{
                width: "50%",
                backgroundColor: "gray",
                borderRadius: "8px",
                paddingLeft: "30px",
              }}
            >
              <h4 style={{ color: "white" }}> Unpacked Orders </h4>
              <h1 style={{ color: "white" }}>15</h1>
            </div>
          </div>
          {orders.map((order, index) => (
            <Container key={index}>
              <SpaceBetween direction="vertical" size="m">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <strong>Order ID: {order.orderId}</strong>
                      <span
                        style={{
                          backgroundColor:
                            order.status === "packed" ? "#0972D3" : "gray",
                          color: "white",
                          padding: "5px",
                          borderRadius: "4px",
                        }}
                      >
                        {order.status} Order
                      </span>
                    </div>
                    <div>Customer Name: {order.customerName}</div>
                    <div>Total Items: {order.totalItems} Items</div>
                  </Box>
                  <Badge color="gray">{order.status} Order</Badge>
                </Box>
                <hr></hr>
                <Box textAlign="center">
                  <Button onClick={() => navigate("/app/OrderDetails")}  variant="primary">View Details</Button>
                </Box>
              </SpaceBetween>
            </Container>
          ))}
        </SpaceBetween>
      </ContentLayout>
    </>
  );
};

export default Products;

