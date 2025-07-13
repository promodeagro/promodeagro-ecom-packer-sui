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

// Utility to parse DynamoDB JSON to plain JS
function parseDynamoDB(item) {
  if (item === null || typeof item !== 'object') return item;
  if ('S' in item) return item.S;
  if ('N' in item) return Number(item.N);
  if ('BOOL' in item) return item.BOOL;
  if ('L' in item) return item.L.map(parseDynamoDB);
  if ('M' in item) {
    const obj = {};
    for (const key in item.M) {
      obj[key] = parseDynamoDB(item.M[key]);
    }
    return obj;
  }
  return item;
}

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
        // Check if response is DynamoDB format (has .S, .N, .M, .L)
        let data = response.data || response;
        if (data && (data.S || data.N || data.M || data.L)) {
          data = parseDynamoDB(data);
        }
        setOrderDetails(data);
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

  console.log("Packed Order Details:", orderDetails);

  // Use the actual API field names
  const {
    order_id,
    customer_name,
    total_items,
    items,
    status,
    packed_by,
    packed_at,
    created_at,
    price,
    payment_method,
    paymentDetails,
    deliveryCharges,
    subTotal,
    tax,
    totalSavings,
    totalPrice,
    finalTotal,
    address,
    // Add more fields as needed
  } = orderDetails;
  // Prefer camelCase or snake_case, fallback to DynamoDB field names
  const displayOrderId = order_id || orderDetails.orderId;
  // Robust fallback for customer name
  let displayCustomerName =
    customer_name ||
    orderDetails.customerName ||
    (address && address.name) ||
    (address && address.M && address.M.name && address.M.name.S) ||
    "N/A";
  const displayPackedBy = packed_by || orderDetails.packedBy || 'N/A';
  const displayPackedAt = packed_at || orderDetails.packedAt || 'N/A';
  const displayCreatedAt = created_at || orderDetails.createdAt || 'N/A';
  const displayStatus = status || 'Packed';
  // Robust fallback for total items
  let displayTotalItems = 0;
  if (typeof total_items === "number" && !isNaN(total_items)) {
    displayTotalItems = total_items;
  } else if (Array.isArray(items)) {
    displayTotalItems = items.length;
  }
  const displayItems = items || [];
  const displayPrice = price || finalTotal || totalPrice || 'N/A';
  const displayPaymentMethod = payment_method || (paymentDetails && paymentDetails.method) || 'N/A';
  const costDetails = orderDetails.cost_details || {};
  const displaySubTotal =
    subTotal !== undefined && subTotal !== null
      ? subTotal
      : (costDetails.sub_total !== undefined ? costDetails.sub_total : 0);
  const displayDeliveryCharges =
    deliveryCharges !== undefined && deliveryCharges !== null
      ? deliveryCharges
      : (costDetails.shipping_charges !== undefined ? costDetails.shipping_charges : 0);
  const displayTax =
    tax !== undefined && tax !== null
      ? tax
      : (costDetails.tax !== undefined ? costDetails.tax : 0);
  const displayTotalSavings =
    totalSavings !== undefined && totalSavings !== null
      ? totalSavings
      : (costDetails.total_savings !== undefined ? costDetails.total_savings : 0);
  const displayTotalPrice =
    price !== undefined && price !== null
      ? price
      : (costDetails.total_amount !== undefined ? costDetails.total_amount : (displaySubTotal + displayDeliveryCharges + displayTax));

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
          <span className="value">{displayOrderId}</span>
        </div>
        <div className="info-row">
          <span className="label">Customer Name :</span>
          <span className="value">{displayCustomerName || "N/A"}</span>
        </div>
        <div className="info-row">
          <span className="label">Packed By :</span>
          <span className="value">{displayPackedBy}</span>
        </div>
        <div className="info-row">
          <span className="label">Packed At :</span>
          <span className="value">{displayPackedAt}</span>
        </div>
        <div className="info-row">
          <span className="label">Created At :</span>
          <span className="value">{displayCreatedAt}</span>
        </div>
        <div className="info-row">
          <span className="label">Status :</span>
          <span className="value">{displayStatus}</span>
        </div>
        <div className="info-row">
          <span className="label">Total Items :</span>
          <span className="value">{displayTotalItems}</span>
        </div>
        <div className="info-row">
          <span className="label">Price :</span>
          <span className="value">₹{displayPrice}</span>
        </div>
        <div className="info-row">
          <span className="label">Payment Method :</span>
          <span className="value">{displayPaymentMethod}</span>
        </div>
      </div>

      <hr />

      {/* Items Display */}
      <div className="items-container">
        {(!displayItems || displayItems.length === 0) ? (
          <div>No items found for this order.</div>
        ) : (
          displayItems.map((item, index) => (
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
      <hr />
      {/* Cost Details */}
      <div className="details">
        <div className="info-row">
          <span className="label">Sub Total:</span>
          <span className="value">₹{displaySubTotal}</span>
        </div>
        <div className="info-row">
          <span className="label">Shipping Charges:</span>
          <span className="value">₹{displayDeliveryCharges}</span>
        </div>
        <div className="info-row">
          <span className="label">Tax:</span>
          <span className="value">₹{displayTax}</span>
        </div>
        <div className="info-row">
          <span className="label">Total Savings:</span>
          <span className="value">₹{displayTotalSavings}</span>
        </div>
        <div className="info-row">
          <span className="label">Total Amount:</span>
          <span className="value">₹{displayTotalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
