import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class supplierObj {
  id;
  name;
  address;
  constructor(id, name, address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
class Supplier extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      suppliers: this.createSuppliers()
    };
  }
  render() {
    console.log("rendering");
    console.log(this.state.suppliers);
    return (
      <div className="wrapper">
        <button type="button" className="btn btn-primary popupButtonStyle">
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
                <div key={item.id} className="tableItemStyleCustom">
                  <div>{item.name}</div>
                  <div>{item.address}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  createSuppliers() {
    var suppliersDummy = new Array();
    suppliersDummy.push(new supplierObj("1", "Bakers", "64 Montrose Avenue"));
    suppliersDummy.push(
      new supplierObj("2", "Pizza Makers", "65 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("3", "Corona Makers", "66 Montrose Avenue")
    );
    suppliersDummy.push(new supplierObj("4", "Wendys", "67 Montrose Avenue"));
    suppliersDummy.push(
      new supplierObj("5", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("6", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("7", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("8", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("9", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("10", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("11", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("12", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("13", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("14", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("15", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("16", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("17", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("18", "McDonalds", "68 Montrose Avenue")
    );
    suppliersDummy.push(
      new supplierObj("19", "McDonalds", "68 Montrose Avenue")
    );
    return suppliersDummy;
  }
}

export default Supplier;