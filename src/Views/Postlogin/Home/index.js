import React, { useEffect } from "react";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  BreadcrumbGroup,
} from "@cloudscape-design/components";
import ContentLayout from "@cloudscape-design/components/content-layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "Redux-Store/Orders/OrdersThunk";
import status from "Redux-Store/Constants";

const Dashboard = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.orders.ordersData);
  const orders = ordersData?.data?.UnpackedOrders
  console.log(orders,"order from Ui");
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

   
const navigate=useNavigate()

  return (
    <ContentLayout
      disableOverlap
      headerVariant="high-contrast"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Home", href: "/app/dashboard" }]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <SpaceBetween direction="vertical" size="xl">
        <h2 className="header_underline">Today's Orders</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "50%",
              backgroundColor: "#414D5CE5",
              borderRadius: "8px",
              paddingLeft: "20px",
              paddingTop: "10px",
              height: "80px",
              boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
              Unpacked Orders
            </div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
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
            onClick={() => navigate("/app/Orders")} // Navigate to packed orders page
          >
            <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
              Packed Orders
            </div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
              25
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Container key={index}>
              <SpaceBetween direction="vertical" size="xs">
                <Box>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <strong>Order ID: {order.OrderId}</strong>
                    <Badge>{order?.OrderStatus}</Badge>
                  </div>
                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name :</span>
                        <span className="name">{order?.CustomerName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items :</span>
                        <span className="items">{order?.TotalItems}Items</span>
                      </div>
                    </div>
                  </SpaceBetween>
                </Box>

                <hr />

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate("/app/StartOrder")}
                  // disabled={orderStatus === status.IN_PROGRESS}
                   // Disable if loading
                >
                  Start Order
                </Button>
              </SpaceBetween>
            </Container>
          ))
        ) : (
          <div>No orders available</div>
        )}
      </SpaceBetween>
    </ContentLayout>
  );
};

export default Dashboard;




