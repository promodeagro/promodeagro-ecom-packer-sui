import React from "react";
import Header from "@cloudscape-design/components/header";
import ContentLayout from "@cloudscape-design/components/content-layout";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,

} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";
import { BreadcrumbGroup } from "@cloudscape-design/components";
const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate
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
      
       disableOverlap
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
              onClick={() => navigate("/app/products")} // Navigate to packed orders page
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
               
                </Box>
                <hr></hr>
                <Box textAlign="center">
                  <Button variant="primary" onClick={() => navigate("/app/customers")} >Start Order</Button>
                </Box>
              </SpaceBetween>
            </Container>
          ))}
        </SpaceBetween>
      </ContentLayout>
    </>
  );
};

export default Dashboard;

