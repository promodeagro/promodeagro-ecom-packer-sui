import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnpackedOrders } from "Redux-Store/Orders/OrdersThunk";
import { fetchpackedOrders } from 'Redux-Store/PackedOrders/PackedOrderThunk';

const HeaderCards = ({ onSelect, selectedTab }) => {
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.orders?.ordersData);
    const unpackorders = ordersData?.data;
    const packedOrdersData = useSelector((state) => state.Packedorders?.ordersData);
    const packedOrders = packedOrdersData?.data;
    // console.log(unpackorders, "order from Ui");
    useEffect(() => {
      dispatch(fetchUnpackedOrders());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchpackedOrders());
    }, [dispatch]);

    // Helper to robustly get the unpacked order count
    const getUnpackedCount = () => {
      if (unpackorders?.TotalUnpackedOrders !== undefined) return unpackorders.TotalUnpackedOrders;
      if (Array.isArray(unpackorders)) return unpackorders.length;
      if (Array.isArray(unpackorders?.orders)) return unpackorders.orders.length;
      if (Array.isArray(unpackorders?.data)) return unpackorders.data.length;
      return 0;
    };
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Unpacked Orders Header Card */}
      <div
        style={{
          width: "50%",
          backgroundColor: selectedTab === "unpacked" ? "#414D5CE5" : "#6c757d",
          borderRadius: "8px",
          paddingLeft: "20px",
          paddingTop: "10px",
          height: "80px",
          boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.25)",
          cursor: "pointer",
        }}
        onClick={() => onSelect && onSelect("unpacked")}
      >
        <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
          Unpacked Orders
        </div>
        <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
          {getUnpackedCount()}
        </div>
      </div>

      {/* Packed Orders Header Card */}
      <div
        style={{
          width: "50%",
          backgroundColor: selectedTab === "packed" ? "#0972D3" : "#6c757d",
          borderRadius: "8px",
          paddingLeft: "20px",
          paddingTop: "10px",
          cursor: "pointer",
          height: "80px",
        }}
        onClick={() => onSelect && onSelect("packed")}
      >
        <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>
          Packed Orders
        </div>
        <div style={{ color: "white", fontWeight: "800", fontSize: "32px" }}>
          {packedOrders?.TotalPackedOrders ?? (Array.isArray(packedOrders) ? packedOrders.length : 0)}
        </div>
      </div>
    </div>
  );
};

export default HeaderCards;