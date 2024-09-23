import React from "react";
import {
  Container,
  Header,
  Button,
  Box,
  SpaceBetween,
  TextContent,
  ContentLayout,
  BreadcrumbGroup,
  Badge
} from "@cloudscape-design/components";
import potatoImg from "../../../Assets/Images/Tomato.jpg";
import tomatoImg from "../../../Assets/Images/Tomato.jpg";
import carrotImg from "../../../Assets/Images/Tomato.jpg";
import cucumberImg from "../../../Assets/Images/Tomato.jpg"
import { useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate(); // Initialize navigate
  const items = [
    {
      name: "Potato",
      quantity: "05 Kgs",
      price: "Rs. 250",
      image: potatoImg,
    },
    {
      name: "Tomato",
      quantity: "500 Grams",
      price: "Rs. 250",
      image: tomatoImg,
    },
    {
      name: "Carrot",
      quantity: "05 Pieces",
      price: "Rs. 250",
      image: carrotImg,
    },
    {
      name: "Cucumber",
      quantity: "05 Kgs",
      price: "Rs. 250",
      image: cucumberImg,
    },
    // Add more items as needed
  ];

  return (
    <ContentLayout
      disableOverlap
      headerVariant="high-contrast"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Home", href: "/app/dashboard" },
            { text: " Order Details", href: "/app/customers" },
          ]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
        <>
            {/* Header Section */}
            <div style={{ display: "flex", gap: "3px" }}>
              <Button
                onClick={() => navigate(-1)}
                variant="icon"
                iconName="arrow-left"
              ></Button>
              <h3> View Details</h3>
            </div>

            <div className="order-details">
      <div className="info-row">
        <span className="label">Order ID :</span>
        <span className="value">54764</span>
      </div>
      <div className="info-row">
        <span className="label">Customer Name :</span>
        <span className="value">Maruti S</span>
      </div>
      <div className="info-row">
        <span className="label">Payment :</span>
        <span className="value">COD</span>
      </div>
      <div className="info-row">
        <span className="label">Price :</span>
        <span className="value">RS. 2980</span>
      </div>
      <div className="items-list">
        <span className="items-label">Items list <span className="items-count">(16 Items)</span></span>
        {/* <button className="packed-btn"> */}
          <Badge color="blue">
          packed Order
          </Badge>
         {/* </button> */}
      </div>
    </div>
              <hr />

              {/* Items Display */}
              <div className="items-container">
              {items.map((item, index) => (
         <div className="product-card">
         <div className="image-container">
           <img
             src={item.image} // Replace with actual image link
             alt="Potato"
             className="product-image"
           />
         </div>
         <div className="product-details">
           <div className="detail-row">
             <span className="label-prod">Name :</span>
             <span className="value-prod">Potato</span>
           </div>
           <div className="detail-row">
             <span className="label-prod">Quantity :</span>
             <span className="value-prod">05 Kgs</span>
           </div>
           <div className="detail-row">
             <span className="label-prod">Price :</span>
             <span className="value-prod">Rs. 250</span>
           </div>
         </div>
       </div>
              ))}
              </div>
       

            {/* Cost Details Section */}
            <h3>Cost Details</h3>
            <SpaceBetween direction="vertical" size="l">
            <Container>
              <SpaceBetween direction="vertical" size="xxs">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sub Total :</span>
                  <strong>RS. 2980</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping Charges :</span>
                  <strong>RS. 80</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Gross Amount :</span>
                  <strong>RS. 2980</strong>
                </div>
              </SpaceBetween>
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  alignItems:"center",
                  alignContent:"center"
                }}
              >
                <span>Total Amount :</span>
                <span>RS. 2980</span>
              </div>
            </Container>
              </SpaceBetween>
    
          </>
    </ContentLayout>
  );
};

export default OrderDetails;
