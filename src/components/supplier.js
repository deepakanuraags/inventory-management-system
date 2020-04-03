import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./reusable/modal";
import config from "../config/config.json";
import { SupplierService } from "../services/supplier-service";
class SupplierModel {
  supplierName;
  supplierAddress;
  constructor(supplierName, supplierAddress) {
    this.supplierName = supplierName;
    this.supplierAddress = supplierAddress;
  }
}
class Supplier extends Component {
  supplierService = new SupplierService();
  state = {};

  constructor() {
    super();
    this.state = {
      suppliers: [],
      modalToggle: false,
      addSupplier: new SupplierModel("", "")
    };
    this.getSuppliers();
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    console.log("rendering");
    console.log(this.state.suppliers);
    return (
      <div className="wrapper supplier">
        <button
          type="button"
          className="btn btn-primary popupButtonStyle"
          onClick={this.onAddSupplier}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Supplier
        </button>
        <div className="tableStyleCustom">
          <div key="0" className="tableHead">
            <div className="customWidth">Name</div>
            <div className="customWidth">Address</div>
          </div>
          <div className="resultWrapper">
            {this.state.suppliers.map(function(item, idx) {
              return (
                <div key={idx} className="tableItemStyleCustom">
                  <div className="customWidth">{item.supplierName}</div>
                  <div className="customWidth">{item.supplierAddress}</div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          show={this.state.modalToggle}
          title={"Add Supplier"}
          close={this.popupClose.bind(this)}
          onSubmit={this.persistInBackend.bind(this)}
        >
          <form>
            <div className="form-group">
              <label>Supplier Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={this.state.addSupplier.supplierName}
                onChange={evt => this.handleChange(evt, "supplierName")}
              />

              <label>Supplier Address</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter supplierAddress"
                value={this.state.addSupplier.supplierAddress}
                onChange={evt => this.handleChange(evt, "supplierAddress")}
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  handleChange = (e, type) => {
    if (type == "supplierName") {
      e.persist();
      this.setState(prevState => {
        let addSupplier = Object.assign({}, prevState.addSupplier);
        addSupplier.supplierName = e.target.value;
        console.log(addSupplier);
        return { addSupplier };
      });
    } else if (type == "supplierAddress") {
      e.persist();
      this.setState(prevState => {
        let addSupplier = Object.assign({}, prevState.addSupplier);
        addSupplier.supplierAddress = e.target.value;
        console.log(addSupplier);
        return { addSupplier };
      });
    }
  };

  persistInBackend() {
    console.log(this.state.addSupplier.supplierName);
    console.log(this.state.addSupplier.supplierAddress);
    this.popupClose();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.addSupplier)
    };
    fetch(config.backendUrl + "createSupplier", requestOptions)
      .then(data =>
        this.setState(prevState => {
          let suppliers = [];
          let addSupplier = Object.assign({}, prevState.addSupplier);
          suppliers = suppliers.concat(prevState.suppliers);
          suppliers.push(
            new SupplierModel(
              addSupplier.supplierName,
              addSupplier.supplierAddress
            )
          );
          addSupplier.supplierAddress = "";
          addSupplier.supplierName = "";
          console.log(this.state);
          return { addSupplier, suppliers };
        })
      )
      .catch(error => console.log("An error occured ", error));
  }

  onAddSupplier = e => {
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

  getSuppliers() {
    this.supplierService
      .getSuppliers()
      .then(data => {
        this.setState({ suppliers: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Supplier;
