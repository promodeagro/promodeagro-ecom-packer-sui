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

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve the access token from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.accessToken;

        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        // Make the API request
        const response = await axios.get(
          "https://bytud12spg.execute-api.ap-south-1.amazonaws.com/packer/order/6679942e-ab1e-4de1-8b1b-382a3ed9a044",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <strong>Order ID: {order?.id}</strong>
                    <Badge>
                      Unpacked
                    </Badge>
                  </div>

                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name :</span>
                        <span className="name">
                          {order?.paymentDetails?.paymentLink?.customer_details
                            ?.customer_name || "N/A"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items :</span>
                        <span className="items">
                          {order?.items?.length} Items
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Price :</span>
                        <span className="price">
                          ₹{order?.totalPrice || "0.00"}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="label">Delivery Slot :</span>
                        <span className="slot">
                          {order?.deliverySlot?.startTime || "N/A"} -{" "}
                          {order?.deliverySlot?.endTime || "N/A"}
                        </span>
                      </div>
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
