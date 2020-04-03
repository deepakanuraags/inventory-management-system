import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./css/modal.css";
import "./css/order.css";
import "./css/supply-log.css";
import Nav from "./nav.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Products from "./components/products";
import Supplier from "./components/supplier";
import SupplyLogs from "./components/supplyLogs";
import Orders from "./components/orders";
import Customer from "./components/customer";
import Dashboard from "./components/Dashboard";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav className="navig" />
          <div className="appContent">
            {/* <div className="appHeader">Inventory Management System</div> */}
            <div className="routeContent">
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/products" component={Products} />
                <Route path="/Supplier" component={Supplier} />
                <Route path="/SupplyLogs" component={SupplyLogs} />
                <Route path="/Orders" component={Orders} />
                <Route path="/Customers" component={Customer} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
