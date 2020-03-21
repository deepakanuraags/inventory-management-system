import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "rgb(35, 55, 88)",
          minWidth: "15vw",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <span
          className="navbar-text"
          style={{
            backgroundColor: "rgb(35, 55, 88)",
            marginBottom: "auto",
            fontSize: "1.5em"
          }}
        >
          Inventory Management System
        </span>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button> */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/Dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/Products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Supplier">
                Supplier
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/supplyLogs">
                Supply Logs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
