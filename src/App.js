import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import Orders from "./pages/orders";
import Products from "./pages/Products";
import onScan from "onscan.js";
function App() {
  useEffect(() => {
    onScan.attachTo(document);
  }, []);
  return (
    <div className="App">
      <div className="all">
        <Switch>
          <Route path="/products/:id" component={Products} />
          <Route exact path="/orders" component={Orders} />
          <Redirect from="/" to="/orders" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
