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
  Header
} from "@cloudscape-design/components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchpackedOrders } from "Redux-Store/PackedOrders/PackedOrderThunk";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderCards from "../HeaderCards";

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
        <Header variant="h2">
            <span className="header_underline">Packed Orders</span>
            </Header>

        <HeaderCards/>
          {Packedorders.map((order, index) => (
            <Container key={index}>
              <SpaceBetween direction="vertical" size="xs">
                <Box>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Order ID: {order.OrderId?.slice(-7)}</strong>
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
