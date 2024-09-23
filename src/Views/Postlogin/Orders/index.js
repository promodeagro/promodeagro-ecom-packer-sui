import React from "react";
import Header from "@cloudscape-design/components/header";
import ContentLayout from "@cloudscape-design/components/content-layout";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  Flashbar,
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
      status: "packed",
    },
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "packed",
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
              { text: "Packed Orders", href: "/app/Orders" },
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
          <h2
            className="header_underline"
          >
            Packed Orders
          </h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                width: "50%",
                backgroundColor: "#414D5CE5",
                borderRadius: "8px",
                paddingLeft: "20px",
                paddingTop: "10px",
                height: "80px",
                cursor:"pointer",
                boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => navigate("/app/Home")}
            >
              <div
                style={{ color: "white", fontWeight: "700", fontSize: "12px" }}
              >
                {" "}
                Unpacked Orders{" "}
              </div>
              <div
                style={{ color: "white", fontWeight: "800", fontSize: "32px" }}
              >
                15
              </div>
            </div>
            <div
              style={{
                width: "50%",

                backgroundColor: "#0972D3",
                borderRadius: "8px",
                paddingLeft: "20px",
                paddingTop: "10px",
                cursor: "pointer",
                height: "80px", // Change to pointer to show it's clickable
              }}
              // Navigate to packed orders page
            >
              <div
                style={{ color: "white", fontWeight: "700", fontSize: "12px" }}
              >
                {" "}
                Packed Orders{" "}
              </div>
              <div
                style={{ color: "white", fontWeight: "800", fontSize: "32px" }}
              >
                25
              </div>
            </div>
          </div>
          {orders.map((order, index) => (
            <Container key={index}>
              <SpaceBetween direction="vertical" size="xs">
                <Box>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <strong>Order ID: {order.orderId}</strong>
                
                    <Badge color="blue">
                      {order.status} Order
                      </Badge>
                  
                  </div>
                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name :</span>
                        <span className="name">Maruti S</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items :</span>
                        <span className="items">16 Items</span>
                      </div>
                    </div>
                  </SpaceBetween>
                </Box>

                <hr></hr>
                {/* <Box textAlign="center"> */}
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate("/app/OrderDetails")}
                >
                  View Details
                </Button>
                {/* </Box> */}
              </SpaceBetween>
            </Container>
          ))}
        </SpaceBetween>
      </ContentLayout>
    </>
  );
};

export default Products;

