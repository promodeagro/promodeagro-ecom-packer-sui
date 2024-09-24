import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  SpaceBetween,
  Badge,
  BreadcrumbGroup,
} from "@cloudscape-design/components";
import { useParams, useNavigate } from "react-router-dom";


const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // State to store order details
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order details from API
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://7fy0psdjel.execute-api.us-east-1.amazonaws.com/dev/OrderDetails/${orderId}`); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
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

  const { CustomerName, Payment, Price, ItemsList, CostDetails,items } = orderDetails;
  console.log(orderDetails,"specific");
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
        <h3>View Details</h3>
      </div>

      {/* Order Details */}
      <div className="details">
        <div className="info-row">
          <span className="label">Order ID :</span>
          <span className="value">{orderId}</span>
        </div>
        <div className="info-row">
          <span className="label">Customer Name :</span>
          <span className="value">{CustomerName}</span>
        </div>
        <div className="info-row">
          <span className="label">Payment :</span>
          <span className="value">{Payment.method}</span>
        </div>
        <div className="info-row">
          <span className="label">Price :</span>
          <span className="value">₹{Price}</span>
        </div>
        <div className="items-list">
          <span className="items-label">
            Items list <span className="items-count">({items} Items)</span>
          </span>
          <Badge color="blue">Packed Order</Badge>
        </div>
      </div>

      <hr />

      {/* Items Display */}
      <div className="items-container">
        {ItemsList.map((item, index) => (
          <div key={index} className="product-card">
            <div className="image-container">
              <img
                src={item.Images
                }
                alt={item.Name}
                className="product-image"
              />
            </div>
            <div className="details">
              <div className="info-row">
                <span className="label">Name :</span>
                <span className="value">{item.Name}</span>
              </div>
              <div className="info-row">
                <span className="label">Quantity :</span>
                <span className="value">{item.Quantity}</span>
              </div>
              <div className="info-row">
                <span className="label">Price :</span>
                <span className="value">₹{item.Price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cost Details */}
      <h3>Cost Details</h3>
      <SpaceBetween direction="vertical" size="l">
        <Container>
          <SpaceBetween direction="vertical" size="xxs">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Sub Total :</span>
              <strong>₹{CostDetails.SubTotal}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Shipping Charges :</span>
              <strong>₹{CostDetails.ShippingCharges}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Gross Amount :</span>
              <strong>₹{CostDetails.GrossDetails}</strong>
            </div>
          </SpaceBetween>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              alignItems: "center",
            }}
          >
            <span>Total Amount :</span>
            <span>₹{CostDetails.TotalAmount}</span>
          </div>
        </Container>
      </SpaceBetween>
    </div>
  );
};

export default OrderDetails;
