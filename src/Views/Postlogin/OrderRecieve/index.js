import React from 'react';
// import './OrderCard.css'; // Create a CSS file for custom styles

function OrderCard() {
  return (
    <div className="order-card-wrapper">
      <div className="order-card-header">
        <h2>Order Call</h2>
        <button className="close-button">X</button>
      </div>

      <div className="order-card-content">
        <h3 className="order-title">New Order Assign</h3>
        <div className="order-details">
          <p><strong>Order ID: </strong> 54764</p>
          <span className="badge">Unpacked Order</span>
          <p><strong>Customer Name: </strong> Maruti S</p>
          <p><strong>Total Items: </strong> 16 Items</p>
        </div>

        <div className="order-action">
          <button className="start-order-button">
            Start Order 
            <span className="order-badge">10</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
