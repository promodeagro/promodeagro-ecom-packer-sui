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
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchpackedOrders } from "Redux-Store/PackedOrders/PackedOrderThunk";
import { fetchUnpackedOrders } from "Redux-Store/Orders/OrdersThunk";
import HeaderCards from "../HeaderCards";

const PackedOrders = () => {
  const dispatch = useDispatch();
  const packedData = useSelector((state) => state.Packedorders?.ordersData);
  const Packedorders = packedData?.data || [];
  const unpackedData = useSelector((state) => state.orders?.ordersData);
  const Unpackedorders = unpackedData?.data || [];
  console.log(Packedorders,"packed order");

  const [selectedTab, setSelectedTab] = useState("packed");

  useEffect(() => {
    if (selectedTab === "packed") {
      dispatch(fetchpackedOrders());
    } else {
      dispatch(fetchUnpackedOrders());
    }
  }, [dispatch, selectedTab]);

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

  // Set timeout to automatically dismiss the flashbar after 5 seconds
  useEffect(() => {
    if (isFlashVisible) {
      const timer = setTimeout(() => {
        setIsFlashVisible(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Clear the timeout if the component unmounts or if flash is dismissed
    }
  }, [isFlashVisible]);

  return (
    <>
      <ContentLayout
        disableOverlap
        headerVariant="high-contrast"
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: "Home", href: "/app/Home" },
              { text: selectedTab === "packed" ? "Packed Orders" : "Unpacked Orders", href: selectedTab === "packed" ? "/app/PackedOrders" : "/app/UnpackedOrders" },
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
            <span className="header_underline">{selectedTab === "packed" ? "Packed Orders" : "Unpacked Orders"}</span>
          </Header>

          <HeaderCards onSelect={setSelectedTab} selectedTab={selectedTab} />
          {selectedTab === "packed"
            ? Packedorders.map((order, index) => {
                // Robust fallback for customer name
                let displayCustomerName =
                  order.customer_name ||
                  order.customerName ||
                  (order.address && order.address.name) ||
                  (order.address && order.address.M && order.address.M.name && order.address.M.name.S) ||
                  "N/A";
                // Robust fallback for total items
                let displayTotalItems = 0;
                if (typeof order.total_items === "number" && !isNaN(order.total_items)) {
                  displayTotalItems = order.total_items;
                } else if (Array.isArray(order.items)) {
                  displayTotalItems = order.items.length;
                }
                return (
                  <Container key={index}>
                    <SpaceBetween direction="vertical" size="xs">
                      <Box>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <strong>Order ID: {order?.order_id}</strong>
                          <Badge color="blue">{order?.status || "Packed"}</Badge>
                        </div>
                        <SpaceBetween direction="vertical" size="s">
                          <div className="customer-info">
                            <div className="info-row">
                              <span className="label">Customer Name:</span>
                              <span className="name">{displayCustomerName}</span>
                            </div>
                            <div className="info-row">
                              <span className="label">Total Items:</span>
                              <span className="items">{displayTotalItems} Items</span>
                            </div>
                            {/* Add more fields if your API provides them */}
                          </div>
                        </SpaceBetween>
                      </Box>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => navigate(`/app/PackedOrders/PackedOrderDetails/${order.order_id}`)}
                      >
                        View Details
                      </Button>
                    </SpaceBetween>
                  </Container>
                );
              })
            : Array.isArray(Unpackedorders) && Unpackedorders.length > 0
            ? Unpackedorders.map((order, index) => {
                // Robust fallback for customer name
                let displayCustomerName =
                  order.customer_name ||
                  order.customerName ||
                  (order.address && order.address.name) ||
                  (order.address && order.address.M && order.address.M.name && order.address.M.name.S) ||
                  "N/A";
                // Robust fallback for total items
                let displayTotalItems = 0;
                if (typeof order.total_items === "number" && !isNaN(order.total_items)) {
                  displayTotalItems = order.total_items;
                } else if (Array.isArray(order.items)) {
                  displayTotalItems = order.items.length;
                }
                return (
                  <Container key={index}>
                    <SpaceBetween direction="vertical" size="xs">
                      <Box>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <strong>Order ID: {order?.order_id}</strong>
                          <Badge color="red">{order?.status || "Unpacked"}</Badge>
                        </div>
                        <SpaceBetween direction="vertical" size="s">
                          <div className="customer-info">
                            <div className="info-row">
                              <span className="label">Customer Name:</span>
                              <span className="name">{displayCustomerName}</span>
                            </div>
                            <div className="info-row">
                              <span className="label">Total Items:</span>
                              <span className="items">{displayTotalItems} Items</span>
                            </div>
                          </div>
                        </SpaceBetween>
                      </Box>
                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => navigate(`/app/Home/StartOrder`, { state: { orderDetails: order } })}
                      >
                        Start Order
                      </Button>
                    </SpaceBetween>
                  </Container>
                );
              })
            : <div>No Unpacked Orders found.</div>
          }
        </SpaceBetween>
      </ContentLayout>
    </>
  );
};

export default PackedOrders;
