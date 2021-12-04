import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import classnames from "classnames";

import SidebarProduct from "../components/SidebarProduct";
import LayoutHeader from "../components/LayoutHeader";
import PrintDiv from "../components/PrintDiv";
import ReactToPrint from "react-to-print";

import pustoy from "../assets/img/file.svg";

const Products = ({ match }) => {
  const inputEl = useRef(null);
  const [products, setProducts] = useState([]);
  const [pustoyActive, setpustoyActive] = useState(false);
  const componentRef = useRef();
  const buttonRef = useRef();
  const getallProducts = () => {
    Axios.get(`/v4/desktop/orders/${match.params.id}`).then(({ data }) => {
      setProducts(data.cart_items);
      handleTrigger(data.cart_items);
    });
  };
  useEffect(() => {
    getallProducts();
  }, []);
  useEffect(() => {
    getallProducts();
  }, [match.params.id]);

  const handleTrigger = (data) => {
    document.addEventListener("scan", function (sScancode) {
      handleScan(sScancode.detail.scanCode, data);
    });
  };
  const handlePustoy = (barkod, arr) => {
    if (document.querySelector("#test").value !== "") {
      if (arr.some((el) => el.product_barcode == barkod)) {
        setpustoyActive(false);
      } else {
        setpustoyActive(true);
      }
    } else if (document.querySelector("#test").value == "") {
      setpustoyActive(false);
      setProducts(arr);
    }
  };

  const handleScan = (data, arr) => {
    document.querySelector("#test").value = "";
    const scannedProducts = arr.map((product, index) => {
      if (product.product_barcode === data) {
        arr.move(index, 0);
        product.scanned = true;
      }
      return product;
    });
    setProducts(scannedProducts);
    document.querySelector("#test").value = data;
    handlePustoy(data, scannedProducts);
  };
  const handleCheckBox = (obj) => {
    if (obj.scanned) {
      const scannedProducts = products.map((product) => {
        if (product.product_barcode === obj.product_barcode) {
          product.scanned = false;
        }
        return product;
      });

      setProducts(scannedProducts);
    } else {
      const scannedProducts = products.map((product) => {
        if (product.product_barcode === obj.product_barcode) {
          product.scanned = true;
        }
        return product;
      });
      setProducts(scannedProducts);
    }
  };

  Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };

  return (
    <div className="all-wrapper">
      <SidebarProduct curOrderId={match.params.id} />
      <div className="layout">
        <div style={{ display: "none" }}>
          <PrintDiv printProducts={products} ref={componentRef} />
        </div>
        <LayoutHeader />
        <div className="content-wrapper">
          <div className="content-overflow">
            <div className="content-header">
              <div className={`search-input single-search`}>
                <input
                  autoFocus
                  type="text"
                  placeholder="search"
                  ref={inputEl}
                  id="test"
                  onChange={(e) => handlePustoy(e.target.value, products)}
                />
              </div>
              {/*<input type="text" id="test" />*/}

              <ReactToPrint
                trigger={() => (
                  <button
                    type="button"
                    ref={buttonRef}
                    className="export-btn btn"
                  >
                    export
                  </button>
                )}
                content={() => componentRef.current}
              />
              <button type="button" className="add-new-btn btn">
                qo'shish
              </button>
            </div>
            <div className="tableProduct">
              <table id="products">
                <thead>
                  <tr>
                    <th>#1</th>
                    <th>St</th>
                    <th>Nomi</th>
                    <th>Soni</th>
                    <th>narxi</th>
                    <th>umumiy narxi</th>
                    <th>Mavjud</th>
                    <th>barkod</th>
                    <th>id</th>
                    <th>soni(ombor)</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      className={classnames({
                        "active-row": product.scanned == true,
                      })}
                      key={index}
                    >
                      <td>
                        <div className="img-container">
                          <img src={product.product_image} alt="icon" />
                        </div>
                      </td>
                      <td>{product.store}</td>
                      <td>{product.product}</td>
                      <td>{product.product_quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.total_price}</td>
                      <td>
                        <div
                          onClick={() => handleCheckBox(product)}
                          className={classnames(
                            `checkbox`,
                            {
                              active: product.scanned == true,
                            },
                            "checkbox"
                          )}
                        >
                          <span></span>
                        </div>
                      </td>
                      <td>{product.product_barcode}</td>
                      <td>{product.id}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div
                className={classnames("pustoy-table", {
                  active: pustoyActive == true,
                })}
              >
                <img src={pustoy} alt="" />
                <p>Bu barkod bilan mahsulot yo'q</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
