import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./reusable/modal";

class SupplierModel {
  name;
  address;
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }
}
class Supplier extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      suppliers: this.createSuppliers(),
      modalToggle: false,
      addSupplier: new SupplierModel("", "")
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    console.log("rendering");
    console.log(this.state.suppliers);
    return (
      <div className="wrapper">
        <button
          type="button"
          className="btn btn-primary popupButtonStyle"
          onClick={this.onAddSupplier}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Supplier
        </button>
        <div className="tableStyleCustom">
          <div key="0" className="tableHead">
            <div>Name</div>
            <div>Address</div>
          </div>
          <div className="resultWrapper">
            {this.state.suppliers.map(function(item, idx) {
              return (
                <div key={idx} className="tableItemStyleCustom">
                  <div>{item.name}</div>
                  <div>{item.address}</div>
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
                value={this.state.addSupplier.name}
                onChange={evt => this.handleChange(evt, "name")}
              />

              <label>Supplier Address</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter address"
                value={this.state.addSupplier.address}
                onChange={evt => this.handleChange(evt, "address")}
              />
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  handleChange = (e, type) => {
    if (type == "name") {
      e.persist();
      this.setState(prevState => {
        let addSupplier = Object.assign({}, prevState.addSupplier);
        addSupplier.name = e.target.value;
        console.log(addSupplier);
        return { addSupplier };
      });
    } else if (type == "address") {
      e.persist();
      this.setState(prevState => {
        let addSupplier = Object.assign({}, prevState.addSupplier);
        addSupplier.address = e.target.value;
        console.log(addSupplier);
        return { addSupplier };
      });
    }
  };

  persistInBackend() {
    console.log(this.state.addSupplier.name);
    console.log(this.state.addSupplier.address);
    this.popupClose();
    this.setState(prevState => {
      let suppliers = [];
      let addSupplier = Object.assign({}, prevState.addSupplier);
      suppliers = suppliers.concat(prevState.suppliers);
      suppliers.push(new SupplierModel(addSupplier.name, addSupplier.address));
      addSupplier.address = "";
      addSupplier.name = "";
      console.log(this.state);
      return { addSupplier, suppliers };
    });
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

  createSuppliers() {
    var suppliersDummy = new Array();
    suppliersDummy.push(new SupplierModel("Bakers", "64 Montrose Avenue"));
    suppliersDummy.push(
      new SupplierModel("Pizza Makers", "65 Montrose Avenue")
    );
    suppliersDummy.push(
      new SupplierModel("Corona Makers", "66 Montrose Avenue")
    );
    suppliersDummy.push(new SupplierModel("Wendys", "67 Montrose Avenue"));
    suppliersDummy.push(new SupplierModel("McDonalds", "68 Montrose Avenue"));
    suppliersDummy.push(new SupplierModel("McDonalds", "68 Montrose Avenue"));
    suppliersDummy.push(new SupplierModel("McDonalds", "68 Montrose Avenue"));
    suppliersDummy.push(new SupplierModel("McDonalds", "68 Montrose Avenue"));
    return suppliersDummy;
  }
}

export default Supplier;
