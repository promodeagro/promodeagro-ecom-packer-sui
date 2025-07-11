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
// import HeaderCards from "../HeaderCards";
import axios from "axios";
import config from "Views/Config";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // IGNORE-AUTH-START
        // const user = JSON.parse(localStorage.getItem("user"));
        // const token = user?.accessToken || user?.token;
        // if (!token) {
        //   throw new Error("Authorization token is missing.");
        // }
        // IGNORE-AUTH-END
        // Make the API request
        const response = await axios.get(config.ORDERS_UNPACKED);
        console.log(response,"ordersss");

        setOrders(response.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  console.log(orders,"orderss");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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

     

        {/* Orders List */}
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Container key={index}>
              <SpaceBetween direction="vertical" size="xs">
                <Box>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>Order ID: {order?.order_id}</strong>
                    <Badge>{order?.status || "Unpacked"}</Badge>
                  </div>
                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name :</span>
                        <span className="name">{order?.customer_name || "N/A"}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items :</span>
                        <span className="items">{order?.total_items || 0} Items</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Packed By :</span>
                        <span className="name">{order?.packed_by || "N/A"}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Packed At :</span>
                        <span className="name">{order?.packed_at || "N/A"}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Created At :</span>
                        <span className="name">{order?.created_at || "N/A"}</span>
                      </div>
                      {/* Add more fields if your API provides them */}
                    </div>
                  </SpaceBetween>
                </Box>

                <hr />

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() =>
                    navigate(`/app/Home/StartOrder`, {
                      state: { orderDetails: order },
                    })
                  }
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

export default Home;
