import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./reusable/modal";
import config from "../config/config.json";
import { CustomerService } from "../services/customer-service";
class CustomerModel {
  customerName;
  customerAddress;
  constructor(customerName, customerAddress) {
    this.customerName = customerName;
    this.customerAddress = customerAddress;
  }
}
class Customer extends Component {
  customerService = new CustomerService();
  state = {};

  constructor() {
    super();
    this.state = {
      customers: [],
      modalToggle: false,
      addCustomer: new CustomerModel("", "")
    };
    this.getCustomers();
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    console.log("rendering");
    console.log(this.state.customers);
    return (
      <div className="wrapper supplier">
        <button
          type="button"
          className="btn btn-primary popupButtonStyle"
          onClick={this.onAddCustomer}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Customer
        </button>
        <div className="tableStyleCustom">
          <div key="0" className="tableHead">
            <div className="customWidth">Name</div>
            <div className="customWidth">Address</div>
          </div>
          <div className="resultWrapper">
            {this.state.customers.map(function(item, idx) {
              return (
                <div key={idx} className="tableItemStyleCustom">
                  <div className="customWidth">{item.customerName}</div>
                  <div className="customWidth">{item.customerAddress}</div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          show={this.state.modalToggle}
          title={"Add Customer"}
          close={this.popupClose.bind(this)}
          onSubmit={this.persistInBackend.bind(this)}
        >
          <form>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={this.state.addCustomer.customerName}
                onChange={evt => this.handleChange(evt, "customerName")}
              />

              <label>Customer Address</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Address"
                value={this.state.addCustomer.customerAddress}
                onChange={evt => this.handleChange(evt, "customerAddress")}
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  handleChange = (e, type) => {
    if (type == "customerName") {
      e.persist();
      this.setState(prevState => {
        let addCustomer = Object.assign({}, prevState.addCustomer);
        addCustomer.customerName = e.target.value;
        console.log(addCustomer);
        return { addCustomer };
      });
    } else if (type == "customerAddress") {
      e.persist();
      this.setState(prevState => {
        let addCustomer = Object.assign({}, prevState.addCustomer);
        addCustomer.customerAddress = e.target.value;
        console.log(addCustomer);
        return { addCustomer };
      });
    }
  };

  persistInBackend() {
    console.log(this.state.addCustomer.customerName);
    console.log(this.state.addCustomer.customerAddress);
    this.popupClose();
    this.customerService
      .createCustomer(this.state.addCustomer)
      .then(() =>
        this.setState(prevState => {
          let customers = [];
          let addCustomer = Object.assign({}, prevState.addCustomer);
          customers = customers.concat(prevState.customers);
          customers.push(
            new CustomerModel(
              addCustomer.customerName,
              addCustomer.customerAddress
            )
          );
          addCustomer.customerAddress = "";
          addCustomer.customerName = "";
          console.log(this.state);
          return { addCustomer, customers };
        })
      )
      .catch(error => console.log("An error occured ", error));
  }

  onAddCustomer = e => {
    e.preventDefault();
    this.setState({
      modalToggle: true
    });
  };

  popupClose = e => {
    this.setState({
      modalToggle: false
    });
  };

  getCustomers() {
    this.customerService
      .getCustomers()
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Customer;
