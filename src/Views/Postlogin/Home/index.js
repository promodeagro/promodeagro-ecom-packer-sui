import React, { useEffect } from "react";
import {
  Button,
  Container,
  Badge,
  SpaceBetween,
  Box,
  BreadcrumbGroup,
} from "@cloudscape-design/components";
import ContentLayout from "@cloudscape-design/components/content-layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "Redux-Store/Orders/OrdersThunk";
import status from "Redux-Store/Constants";

const Dashboard = () => {
    const orders = [
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "Unpacked",
    },
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "Unpacked",
    },
    {
      orderId: 54764,
      customerName: "Maruti S",
      totalItems: 16,
      status: "Unpacked",
    },
  ];
const navigate=useNavigate()

  return (
    <ContentLayout
      disableOverlap
      headerVariant="high-contrast"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Home", href: "/app/dashboard" }]}
          ariaLabel="Breadcrumbs"
        />
      }
    >
      <SpaceBetween direction="vertical" size="xl">
        <h2 className="header_underline">Today's Orders</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              width: "50%",
              backgroundColor: "#414D5CE5",
              borderRadius: "8px",
              paddingLeft: "20px",
              paddingTop: "10px",
              height: "80px",
              boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
              Unpacked Orders
            </div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
              15
            </div>
          </div>

          <div
            style={{
              width: "50%",
              backgroundColor: "#0972D3",
              borderRadius: "8px",
              paddingLeft: "20px",
              paddingTop: "10px",
              cursor: "pointer",
              height: "80px", // Change to pointer to show it's clickable
            }}
            onClick={() => navigate("/app/Orders")} // Navigate to packed orders page
          >
            <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
              Packed Orders
            </div>
            <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
              25
            </div>
          </div>
        </div>

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
                    <strong>Order ID: {order.orderId}</strong>
                    <Badge>{order.status} Order</Badge>
                  </div>
                  <SpaceBetween direction="vertical" size="s">
                    <div className="customer-info">
                      <div className="info-row">
                        <span className="label">Customer Name :</span>
                        <span className="name">Maruti S</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Total Items :</span>
                        <span className="items">16 Items</span>
                      </div>
                    </div>
                  </SpaceBetween>
                </Box>

                <hr />

                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate("/app/StartOrder")}
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

export default Dashboard;

// import React from "react";
// import Header from "@cloudscape-design/components/header";
// import ContentLayout from "@cloudscape-design/components/content-layout";
// import {
//   Button,
//   Container,
//   Badge,
//   SpaceBetween,
//   Box,

// } from "@cloudscape-design/components";
// import { useNavigate } from "react-router-dom";
// import { BreadcrumbGroup } from "@cloudscape-design/components";
// const Home = () => {
//   const navigate = useNavigate(); // Initialize navigate
//   const orders = [
//     {
//       orderId: 54764,
//       customerName: "Maruti S",
//       totalItems: 16,
//       status: "Unpacked",
//     },
//     {
//       orderId: 54764,
//       customerName: "Maruti S",
//       totalItems: 16,
//       status: "Unpacked",
//     },
//     {
//       orderId: 54764,
//       customerName: "Maruti S",
//       totalItems: 16,
//       status: "Unpacked",
//     },
//   ];

//   return (
//     <>
//       <ContentLayout
      
//        disableOverlap
//        headerVariant="high-contrast"
//         breadcrumbs={
//           <BreadcrumbGroup
//             items={[
//               { text: "Home", href: "/app/dashboard" },
//               // { text: "Packed Orders", href: "/app/dashboard/products" },
//             ]}
//             ariaLabel="Breadcrumbs"
//           />
//         }
//       >
//         <SpaceBetween direction="vertical" size="xl">
//           <Header variant="h2">Today's Orders</Header>

//           <div style={{ display: "flex", gap: "10px" }}>
//           <div
//               style={{
//                 width: "50%",
//                 backgroundColor: "#0972D3",
//                 borderRadius: "8px",
//                 paddingLeft: "30px",
//                 cursor: "pointer", // Change to pointer to show it's clickable
//               }}
//               onClick={() => navigate("/app/products")} // Navigate to packed orders page
//             >
//               <h4 style={{ color: "white" }}> Packed Orders </h4>
//               <h1 style={{ color: "white", fontWeight: "bolder" }}>25</h1>
//             </div>

//             <div
//               style={{
//                 width: "50%",
//                 backgroundColor: "gray",
//                 borderRadius: "8px",
//                 paddingLeft: "30px",
//               }}
//             >
//               <h4 style={{ color: "white" }}> Unpacked Orders </h4>
//               <h1 style={{ color: "white" }}>15</h1>
//             </div>
//           </div>
//           {orders.map((order, index) => (
//             <Container key={index}>
//               <SpaceBetween direction="vertical" size="m">
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >
//                   <Box>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <strong>Order ID: {order.orderId}</strong>
//                       <Badge color="blue">
//                       {order.status} Order
//                       </Badge>
//                     </div>
//                     <div>Customer Name: {order.customerName}</div>
//                     <div>Total Items: {order.totalItems} Items</div>
//                   </Box>
               
//                 </Box>
//                 <hr></hr>
//                 <Box textAlign="center">
//                   <Button variant="primary" onClick={() => navigate("/app/StartOrder")} >Start Order</Button>
//                 </Box>
//               </SpaceBetween>
//             </Container>
//           ))}
//         </SpaceBetween>
//       </ContentLayout>
//     </>
//   );
// };

// export default Home;



// import React, { useState, useEffect } from 'react';

// const UnpackedOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch orders from the API
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('https://7fy0psdjel.execute-api.us-east-1.amazonaws.com/dev/getAllUnpackedOrders');
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
//       const data = await response.json();
//       setOrders(data.UnpackedOrders); // Update state with the UnpackedOrders array
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false); // Stop loading once the fetch completes
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Call the API when the component mounts
//   }, []);

//   return (
//     <div>
//       <h1>Unpacked Orders</h1>
//       {loading ? (
//         <p>Loading orders...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : (
//         <div>
//           <p>Total Unpacked Orders: {orders.length}</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Customer Name</th>
//                 <th>Total Items</th>
//                 <th>Order Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.OrderId}>
//                   <td>{order.OrderId}</td>
//                   <td>{order.CustomerName || 'N/A'}</td>
//                   <td>{order.TotalItems}</td>
//                   <td>{order.OrderStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnpackedOrders;
