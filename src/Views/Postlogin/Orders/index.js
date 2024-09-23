import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  Flashbar,
  BreadcrumbGroup,
  ContentLayout,
} from "@cloudscape-design/components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchpackedOrders } from "Redux-Store/PackedOrders/PackedOrderThunk";
import { useNavigate, useLocation } from "react-router-dom";

const PackedOrders = () => {
  const dispatch = useDispatch();
  const packedData = useSelector((state) => state.Packedorders?.ordersData);
  const Packedorders = packedData?.data?.PackedOrders || [];
  console.log(Packedorders,"packed order");

  useEffect(() => {
    dispatch(fetchpackedOrders());
  }, [dispatch]);

  const navigate = useNavigate();
  const location = useLocation();
  const { image } = location.state || {};
  const [isFlashVisible, setIsFlashVisible] = useState(true);

  const flashbarItems = [
    {
      type: "success",
      content: "Order packed successfully!",
      dismissible: true,
      onDismiss: () => setIsFlashVisible(false),
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
        {image && isFlashVisible && (
          <Box margin={{ bottom: "s" }}>
            <Flashbar items={flashbarItems} />
          </Box>
        )}
        <SpaceBetween direction="vertical" size="xl">
          <h2 className="header_underline">Packed Orders</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                width: "50%",
                backgroundColor: "#414D5CE5",
                borderRadius: "8px",
                paddingLeft: "20px",
                paddingTop: "10px",
                height: "80px",
                cursor: "pointer",
                boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
              }}
              onClick={() => navigate("/app/Home")}
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
                height: "80px",
              }}
            >
              <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
                Packed Orders
              </div>
              <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
                {Packedorders.length}
              </div>
            </div>
          </div>
          {Packedorders.map((order, index) => (
            <Container key={index}>
              <SpaceBetween direction="vertical" size="xs">
                <Box>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Order ID: {order.OrderId}</strong>
                    <Badge color="blue">{order.OrderStatus} Order</Badge>
                  </div>
                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name:</span>
                        <span className="name">{order.CustomerName}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items:</span>
                        <span className="items">{order.TotalItems} Items</span>
                      </div>
                    </div>
                  </SpaceBetween>
                </Box>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate(`/app/OrderDetails/${order.OrderId}`)}
                >
                  View Details
                </Button>
              </SpaceBetween>
            </Container>
          ))}
        </SpaceBetween>
      </ContentLayout>
    </>
  );
};

export default PackedOrders;
