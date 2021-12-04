import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import axios from "axios";

const LayoutHeader = () => {
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    axios.get("/v4/order/statistics").then(({ data }) => setStatistics(data));
  }, []);

  return (
    <div>
      <div className="header">
        <div className="header__col">
          <div className="title">
            <h2>Umumiy buyurtmalar</h2>
          </div>
          <p>{statistics.total_orders_count}</p>
          <span className="statistics"> 4% </span>
        </div>
        <div className="header__col">
          <div className="title">
            <h2>Kutish jarayonida</h2>
          </div>
          <p>{statistics.total_pending_orders_count}</p>
          <span className="statistics"> 4% </span>
        </div>
        <div className="header__col">
          <div className="title">
            <h2>Yetkazildi</h2>
          </div>
          <p>{statistics.total_delivered_orders_count}</p>
          <span className="statistics"> 4% </span>
        </div>
        <div className="header__col ">
          <div className="title">
            <h2>Bekor qilindi</h2>
          </div>
          <p>{statistics.total_cancelled_orders_count}</p>
          <span className="statistics"> 9 now </span>
        </div>
        <div className="header__col ">
          <div className="title">
            <h2>Kutish jarayonida</h2>
          </div>
          <p>{statistics.total_in_process_orders_count}</p>
          <span className="statistics"> 9 now </span>
        </div>
      </div>
    </div>
  );
};

export default LayoutHeader;
