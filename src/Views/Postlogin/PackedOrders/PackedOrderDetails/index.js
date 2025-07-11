import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  SpaceBetween,
  Badge,
  BreadcrumbGroup,
  Box
} from "@cloudscape-design/components";
import { useParams, useNavigate } from "react-router-dom";
import { postLoginService } from "../../../../Services";
import config from "../../../../Views/Config";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // State to store order details
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await postLoginService.get(`${config.ORDER_DETAILS}/${orderId}`);
        setOrderDetails(response.data || response);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderDetails) {
    return <div>No order details found</div>;
  }

  // Use the actual API field names
  const {
    order_id,
    customer_name,
    total_items,
    status,
    packed_by,
    packed_at,
    created_at,
    items = [],
    price,
    payment_method,
    // Add more fields as needed
  } = orderDetails;

  return (
    <div>
      <BreadcrumbGroup
        items={[
          { text: "Home", href: "/app/Home" },
          { text: "Order Details", href: "/app/orders" },
        ]}
        ariaLabel="Breadcrumbs"
      />

      <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
        <Button
          onClick={() => navigate(-1)}
          variant="icon"
          iconName="arrow-left"
        />
        <Box variant="h2" margin={{ bottom: "l", top: "xs" }}>
          <span className="header_underline">View Details</span>
        </Box>
      </div>

      {/* Order Details */}
      <div className="details">
        <div className="info-row">
          <span className="label">Order ID :</span>
          <span className="value">{order_id}</span>
        </div>
        <div className="info-row">
          <span className="label">Customer Name :</span>
          <span className="value">{customer_name}</span>
        </div>
        <div className="info-row">
          <span className="label">Packed By :</span>
          <span className="value">{packed_by || "N/A"}</span>
        </div>
        <div className="info-row">
          <span className="label">Packed At :</span>
          <span className="value">{packed_at || "N/A"}</span>
        </div>
        <div className="info-row">
          <span className="label">Created At :</span>
          <span className="value">{created_at || "N/A"}</span>
        </div>
        <div className="info-row">
          <span className="label">Status :</span>
          <span className="value">{status || "Packed"}</span>
        </div>
        <div className="info-row">
          <span className="label">Total Items :</span>
          <span className="value">{total_items}</span>
        </div>
        <div className="info-row">
          <span className="label">Price :</span>
          <span className="value">₹{price || "N/A"}</span>
        </div>
        <div className="info-row">
          <span className="label">Payment Method :</span>
          <span className="value">{payment_method || "N/A"}</span>
        </div>
      </div>

      <hr />

      {/* Items Display */}
      <div className="items-container">
        {items.length === 0 ? (
          <div>No items found for this order.</div>
        ) : (
          items.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Container>
                <div className="product-card">
                  <div className="image-container">
                    <img
                      src={item.productImage || item.image || ""}
                      alt={item.productName || item.name || ""}
                      className="product-image"
                    />
                  </div>
                  <div className="details">
                    <div className="info-row">
                      <span className="label">Name :</span>
                      <span className="value">{item.productName || item.name || "N/A"}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Quantity :</span>
                      <span className="value">{item.quantity || "N/A"}</span>
                    </div>
                    <div className="info-row">
                      <span className="label">Price :</span>
                      <span className="value">₹{item.price || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
