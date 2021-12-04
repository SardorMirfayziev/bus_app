import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import convert from "../assets/js/convert";
import SidebarOrder from "../components/SidebarOrder";
import LayoutHeader from "../components/LayoutHeader";
import Dropdown from "../components/dropdown";
import DatePicker from "react-date-picker";
import Search from "../components/Search";
import Axios from "axios";
import removeEmptyParams from "../assets/js/removeQuery";

const Orders = () => {
  let history = useHistory();
  const [tableOrder, setTableOrder] = useState([]);
  let [search, setSearch] = useState("");
  let [activeDrop, setactiveDrop] = useState("");
  let [dateFrom, setDateFrom] = useState(new Date(2019, 1, 12));
  let [dateTo, setDateTo] = useState(new Date());
  const [searchStatus, setsearchStatus] = useState("All");
  const [drops, setDrops] = useState([
    "Pending",
    "Cancelled",
    "Delivered",
    "In_process",
  ]);
  const [dropsSearch, setdropsSearch] = useState([
    "All",
    "Pending",
    "Cancelled",
    "Delivered",
    "In_process",
  ]);

  const activeDropCallback = (e) => {
    setactiveDrop(e);
  };
  const getDefault = () => {
    Axios.get("/v4/desktop/orders/").then(({ data }) => {
      setTableOrder(data.results);
      console.log(data.results);
    });
  };

  useEffect(() => {
    getDefault();
  }, []);

  const handleDateFrom = (e) => {
    console.log(e);
    setDateFrom(e);
  };
  const sendDropActive = (e) => {
    console.log(e);
  };

  const handleDateTo = (e) => {
    setDateTo(e);
  };
  const handleSearch = (e) => {
    setSearch(e);
  };
  const handleDropActiveChange = (e, obj) => {
    Axios.put(`/v4/desktop/orders/${obj.id}/`, {
      id: obj.id,
      customer: obj.customer,
      sales_person: obj.sales_person,
      order_status: e,
    });
  };
  const sendSearchStatus = (e) => {
    setsearchStatus(e);
  };

  const searchAll = () => {
    let query =
      searchStatus == "All"
        ? `query=${search}&from_date=${convert(
            `${dateFrom}`
          )}&to_date=${convert(`${dateTo}`)}`
        : `query=${search}&order_status=${searchStatus}&from_date=${convert(
            `${dateFrom}`
          )}&to_date=${convert(`${dateTo}`)}`;

    Axios.get(`/v4/desktop/orders/?${removeEmptyParams(query)}`).then(
      ({ data }) => {
        setTableOrder(data.results);
        console.log(data.results);
      }
    );
    console.log(`/v4/desktop/orders/?${removeEmptyParams(query)}`);
  };
  useEffect(() => {
    searchAll();
  }, [search, dateFrom, dateTo, searchStatus]);

  const handleClickRoute = (e, obj) => {
    if (!e.target.closest(".status-main")) {
      history.push(`/products/${obj.id}`);
    }
  };

  return (
    <div className="all-wrapper">
      <SidebarOrder />
      <div className="layout">
        <LayoutHeader />
        <div className="content-wrapper">
          <div className="content-overflow">
            <div className="content-header">
              <Dropdown
                drops={dropsSearch}
                label="status"
                sendSearchStatus={sendSearchStatus}
              />
              <div className="data-container">
                <span>Date: </span>
                <DatePicker
                  onChange={(e) => handleDateFrom(e)}
                  value={dateFrom}
                />
                <span className="dateMidlle"> --- </span>
                <DatePicker onChange={(e) => handleDateTo(e)} value={dateTo} />
              </div>
              <Search searchCallback={handleSearch} />

              <button type="button" className="export-btn btn">
                export
              </button>
              <button type="button" className="add-new-btn btn">
                qo'shish
              </button>
            </div>
            <div className="tableOrder">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Agent</th>
                    <th>Created at</th>
                    <th>Store</th>
                    <th>Product count</th>
                    <th>Total price</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tableOrder.map((tr) => (
                    <tr
                      key={tr.id}
                      className="click-tr"
                      onClick={(e) => {
                        handleClickRoute(e, tr);
                      }}
                    >
                      <td>{tr.id}</td>
                      <td>{tr.sales_person}</td>
                      <td>{tr.created_at}</td>
                      <td>
                        {tr.store.map((e, i, arr) =>
                          arr.length > 1 ? <span>{e},</span> : e
                        )}
                      </td>
                      <td>{tr.cart_items.length}</td>
                      <td>{tr.total_price}</td>
                      <td className="status-main">
                        <Dropdown
                          curClass={tr.order_status}
                          drops={drops}
                          obj={tr}
                          sendSearchStatus={sendDropActive}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
