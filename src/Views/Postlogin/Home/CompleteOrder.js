import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Container, SpaceBetween, Flashbar } from "@cloudscape-design/components";
import axios from "axios";

const CompleteOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails, photo } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [flashItems, setFlashItems] = useState([]);

  const handleCompleteOrder = async () => {
    setLoading(true);
    setFlashItems([]);
    try {
      const response = await axios.post("http://localhost:3000/dev/orders/complete", {
        order_id: orderDetails?.order_id,
        photo: photo,
        packed_by: orderDetails?.packed_by || 'packer',
      });
      setFlashItems([
        {
          type: "success",
          content: "Order completed successfully!",
          dismissible: true,
          onDismiss: () => setFlashItems([]),
          id: "success1",
        },
      ]);
      setTimeout(() => navigate(`/app/PackedOrders/PackedOrderDetails/${orderDetails?.order_id}`), 2000);
    } catch (error) {
      setFlashItems([
        {
          type: "error",
          content: `Failed to complete order: ${error.response?.data?.message || error.message}`,
          dismissible: true,
          onDismiss: () => setFlashItems([]),
          id: "error1",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  return (
    <Container>
      <Flashbar items={flashItems} />
      <Box variant="h2">Complete Order</Box>
      <SpaceBetween direction="vertical" size="m">
        <div>
          <strong>Order ID:</strong> {orderDetails.order_id}
        </div>
        <div>
          <strong>Customer Name:</strong> {orderDetails.customer_name}
        </div>
        <div>
          <strong>Total Items:</strong> {orderDetails.total_items}
        </div>
        <div>
          <strong>Status:</strong> {orderDetails.status}
        </div>
        <div>
          <strong>Packed By:</strong> {orderDetails.packed_by}
        </div>
        <div>
          <strong>Packed At:</strong> {orderDetails.packed_at}
        </div>
        <div>
          <strong>Created At:</strong> {orderDetails.created_at}
        </div>
        <div>
          <strong>Photo:</strong>
          {photo ? (
            <img src={photo} alt="Order Photo" style={{ maxWidth: 200, maxHeight: 200, display: "block", marginTop: 10 }} />
          ) : (
            <span> N/A</span>
          )}
        </div>
        <Button
          variant="primary"
          loading={loading}
          onClick={handleCompleteOrder}
        >
          Complete Order
        </Button>
      </SpaceBetween>
    </Container>
  );
};

export default CompleteOrder; 