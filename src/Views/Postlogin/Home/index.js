import React, { useEffect } from "react";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  BreadcrumbGroup,
  Header
} from "@cloudscape-design/components";
import ContentLayout from "@cloudscape-design/components/content-layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "Redux-Store/Orders/OrdersThunk";
import status from "Redux-Store/Constants";
import HeaderCards from "../HeaderCards";

const Home = () => {
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
          items={[{ text: "Home", href: "/app/Home" }]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <SpaceBetween direction="vertical" size="xl">
      <Header variant="h2">
            <span className="header_underline">Today's Orders</span>
            </Header>

      <HeaderCards/>

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
                    <strong>Order ID: {order.OrderId?.slice(-7)}</strong>
                    <Badge>{order?.OrderStatus === "order placed" ? "Unpacked" : ""}</Badge>

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
                  onClick={() => navigate(`/app/Home/StartOrder/${order?.OrderId}`)}
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

export default Home;




