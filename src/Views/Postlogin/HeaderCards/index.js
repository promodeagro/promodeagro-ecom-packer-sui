import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "Redux-Store/Orders/OrdersThunk";
import { fetchpackedOrders } from 'Redux-Store/PackedOrders/PackedOrderThunk';

const HeaderCards = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.orders.ordersData);
    const unpackorders = ordersData?.data
    console.log(unpackorders,"order from Ui");
    useEffect(() => {
      dispatch(fetchOrders());
    }, [dispatch]);
 
    const packedData = useSelector((state) => state.Packedorders?.ordersData);
    const Packedorders = packedData?.data || [];
    // console.log(Packedorders,"packed order");
  
    useEffect(() => {
      dispatch(fetchpackedOrders());
    }, [dispatch]);
  return (
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
      onClick={() => navigate("/app/Home")} // Navigate to packed orders page
    >
      <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
        Unpacked Orders
      </div>
      <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
        {unpackorders?.TotalUnpackedOrders}
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
      onClick={() => navigate("/app/PackedOrders")} // Navigate to packed orders page
    >
      <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
        Packed Orders
      </div>
      <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
        {Packedorders?.TotalPackedOrders}
      </div>
    </div>
  </div>
  )
}

export default HeaderCards