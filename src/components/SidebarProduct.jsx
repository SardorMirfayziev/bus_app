import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Axios from "axios";
import classnames from "classnames";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import Logo from "../assets/img/logo.png";
import Dropdown from "../components/dropdown";
import Ed from "../assets/img/ed.jpg";
import tri from "../assets/img/ellipsis.svg";
import print from "../assets/img/printer.svg";
import Export from "../assets/img/export.svg";
import ReactTooltip from "react-tooltip";

const SidebarProduct = ({ tableName, curOrderId }) => {
  let history = useHistory();
  const [searchStatus, setsearchStatus] = useState("All");
  const [sideOrders, setsideOrders] = useState([]);
  const [sales_person, setsales_person] = useState("");
  const [dropsSearch, setdropsSearch] = useState([
    "All",
    "Pending",
    "Cancelled",
    "Delivered",
    "In_process",
  ]);
  useEffect(() => {
    Axios.get("/v4/desktop/orders/").then(({ data }) => {
      setsideOrders(data.results);
    });
  }, []);

  const handleClickRoute = (obj) => {
    history.push(`/products/${obj.id}`);
  };
  const sendSearchStatus = (e) => {
    setsearchStatus(e);
  };

  const seachAll = () => {
    if (searchStatus == "All" && sales_person == "") {
      Axios.get(`/v4/desktop/orders/`).then(({ data }) => {
        setsideOrders(data.results);
      });
    } else if (searchStatus !== "All" && sales_person == "") {
      Axios.get(`/v4/desktop/orders/?order_status=${searchStatus}`).then(
        ({ data }) => {
          setsideOrders(data.results);
        }
      );
    } else if (searchStatus == "All" && sales_person !== "") {
      Axios.get(`/v4/desktop/orders/?sales_person=${sales_person}`).then(
        ({ data }) => {
          setsideOrders(data.results);
        }
      );
      console.log(`/v4/desktop/orders/?sales_person=${sales_person}`);
    } else if (searchStatus !== "All" && sales_person !== "") {
      Axios.get(
        `/v4/desktop/orders/?sales_person=${sales_person}&order_status=${searchStatus}`
      ).then(({ data }) => {
        setsideOrders(data.results);
      });
    }
  };
  useEffect(() => {
    seachAll();
  }, [sales_person, searchStatus]);
  return (
    <div className="main-sidebar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>

      <div className="products-sidebar">
        <div className="search-input">
          <Dropdown sendSearchStatus={sendSearchStatus} drops={dropsSearch} />
          <input
            type="text"
            onChange={(e) => setsales_person(e.target.value)}
          />
        </div>
        <ul>
          {sideOrders.map((order) => {
            return (
              <li
                onClick={() => handleClickRoute(order)}
                key={order.id}
                className={classnames({
                  active: curOrderId == order.id,
                })}
              >
                <div className="agent-img">
                  <img src={Ed} alt="" />
                </div>
                <div className="agent-content">
                  <p>{order.sales_person}</p>
                  <p className={order.order_status}>{order.order_status}</p>
                </div>
                <div className="agent-price">
                  <p>{order.cart_items.product_quantity} orders</p>
                  <p>{order.id}</p>
                </div>
                <div className="agent-info">
                  <img src={tri} alt="" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="order-config">
        <div className="print" data-tip="Print">
          <img src={print} alt="print" />
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="products"
            filename="Products"
            sheet="tablexls"
          />
        </div>
        <div className="print" data-tip="Export">
          <img src={Export} alt="print" />
        </div>
        <ReactTooltip />
      </div>
    </div>
  );
};

export default SidebarProduct;
