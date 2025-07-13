import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  BreadcrumbGroup,
  Header,
} from "@cloudscape-design/components";
import ContentLayout from "@cloudscape-design/components/content-layout";
import { useNavigate } from "react-router-dom";
import HeaderCards from "../HeaderCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnpackedOrders } from "../../../Redux-Store/Orders/OrdersThunk";
import { fetchpackedOrders } from "../../../Redux-Store/PackedOrders/PackedOrderThunk";

const Home = () => {
  const dispatch = useDispatch();
  const unpackedData = useSelector((state) => state.orders?.ordersData);
  const packedData = useSelector((state) => state.Packedorders?.ordersData);
  const Unpackedorders = unpackedData?.data || [];
  const Packedorders = packedData?.data || [];
  const [selectedTab, setSelectedTab] = useState("unpacked");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTab === "unpacked") {
      dispatch(fetchUnpackedOrders());
    } else {
      dispatch(fetchpackedOrders());
    }
  }, [dispatch, selectedTab]);

  const orders = selectedTab === "unpacked" ? Unpackedorders : Packedorders;

  return (
    <ContentLayout
      disableOverlap
      headerVariant="high-contrast"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Home", href: "/app/Home" }]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <SpaceBetween direction="vertical" size="xl">
        <Header variant="h2">
          <span className="header_underline">Today's Orders</span>
        </Header>

        {/* Header Cards for Unpacked/Packed Orders */}
        <HeaderCards onSelect={setSelectedTab} selectedTab={selectedTab} />

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Container key={index} style={{ borderRadius: 16, marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #eee" }}>
              <SpaceBetween direction="vertical" size="xs">
                <Box>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 18 }}>Order ID : {order?.order_id}</strong>
                    <span style={{ background: selectedTab === "unpacked" ? "#6c757d" : "#0972D3", color: "#fff", borderRadius: 6, padding: "2px 10px", fontWeight: 600, fontSize: 14 }}>
                      {selectedTab === "unpacked" ? "Unpacked Order" : "Packed Order"}
                    </span>
                  </div>
                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name :</span>
                        <span className="name" style={{ fontWeight: 600 }}>{order?.customer_name || order?.customerName || "N/A"}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items :</span>
                        <span className="items" style={{ fontStyle: "italic", fontWeight: 600 }}>{order?.total_items || (order?.items ? order.items.length : 0)} Items</span>
                      </div>
                    </div>
                  </SpaceBetween>
                </Box>
                <hr />
                <Button
                  variant="primary"
                  fullWidth
                  style={{ borderRadius: 8, background: "#0972D3", fontWeight: 700, fontSize: 16 }}
                  onClick={() => {
                    if (selectedTab === "unpacked") {
                      navigate(`/app/Home/StartOrder`, { state: { orderDetails: order } });
                    } else {
                      navigate(`/app/PackedOrders/PackedOrderDetails/${order.order_id}`);
                    }
                  }}
                >
                  {selectedTab === "unpacked" ? "Start Order" : "View Details"}
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

export default Home;
