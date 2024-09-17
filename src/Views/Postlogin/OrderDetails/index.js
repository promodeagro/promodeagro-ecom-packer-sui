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
      <SpaceBetween direction="vertical" size="xl">
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Button  onClick={() => navigate(-1)}  variant="icon" iconName="arrow-left"></Button>
          <Header variant="h3">View Details</Header>
        </div>

        <SpaceBetween size="xs">
          {/* Order Information */}
          <Box>
            <TextContent>Order ID: 54764</TextContent>
            <TextContent>Customer Name: Maruti S</TextContent>
            <TextContent>Payment: COD</TextContent>
            <TextContent>Price: Rs.2980</TextContent>
          </Box>

          {/* Items List Header */}
          <div style={{ display: "flex", justifyContent: "space-between",  }}>
            <Header variant="h4">Items list (16 Items)</Header>
            <p
              style={{
                backgroundColor: "#0972D3",
                color: "white",
                padding: "5px",
                borderRadius: "4px",
                width: "14rem",
                textAlign:"center"
              
              }}
            >
              Unpacked Order
            </p>
            
          </div>
          <hr />

          {/* Items Display */}
        
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  border: '1px solid #e1e1e1',
                  borderRadius: '8px',
                  padding: '10px',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                <div>
                  <TextContent>Name:  &nbsp;&nbsp;{item.name}</TextContent>
                  <TextContent>Quantity:&nbsp;&nbsp; {item.quantity}</TextContent>
                  <TextContent>Price:&nbsp;&nbsp; {item.price}</TextContent>
                </div>
              </div>
            ))}
    
        </SpaceBetween>
    
      {/* Cost Details Section */}
    
     
          <h3>Cost Details</h3>
          <Container>
            <SpaceBetween direction="vertical" size="xxs">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Sub Total :</span>
            <span>RS. 2980</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Shipping Charges :</span>
            <span>RS. 80</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Gross Amount :</span>
            <span>RS. 2980</span>
          </div>
          </SpaceBetween>
          <hr></hr>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
          
            <span>Total Amount :</span>
            <span>RS. 2980</span>
          </div>
          </Container>
   
  
     

      {/* Pack Order Button */}

    


      </SpaceBetween>
    </ContentLayout>
  );
};

export default OrderDetails;
