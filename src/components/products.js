import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./reusable/modal";
import $ from "jquery";
import { SupplierService } from "../services/supplier-service";
import { ProductService } from "../services/product-service";

class SupplierModel {
  supplierName;
  supplierAddress;
  constructor(supplierName, supplierAddress) {
    this.supplierName = supplierName;
    this.supplierAddress = supplierAddress;
  }
}

class ProductsModel {
  productName;
  inventoryReceived;
  inventoryShipped;
  inventoryOnHand;
  minInventoryReq;
  productDesc;
  supplierID;
  supplierName;
  constructor(
    productName,
    inventoryReceived,
    inventoryShipped,
    inventoryOnHand,
    minInventoryReq,
    productDesc,
    supplierID,
    supplierName
  ) {
    this.productName = productName;
    this.inventoryReceived = inventoryReceived;
    this.inventoryShipped = inventoryShipped;
    this.inventoryOnHand = inventoryOnHand;
    this.minInventoryReq = minInventoryReq;
    this.productDesc = productDesc;
    this.supplierID = supplierID;
    this.supplierName = supplierName;
    // $(function() {
    //   $("select").selectpicker();
    // });
  }
}
class Product extends Component {
  productService = new ProductService();
  supplierService = new SupplierService();
  state = {};

  constructor() {
    super();
    this.state = {
      products: [],
      suppliers: [],
      modalToggle: false,
      addProduct: this.createDummyProduct(),
      validations: this.createValidations()
    };
    console.log(this.state);
    this.getProducts();
    this.getSuppliers();
    this.handleChange = this.handleChange.bind(this);
  }

  createDummyProduct() {
    return new ProductsModel("", 0, 0, 0, 0, "", "", "");
  }

  createValidations() {
    return {
      onMinQtyValid: true,
      onHandValid: true,
      productNameValid: true,
      supplierValid: true
    };
  }
  render() {
    console.log("rendering");
    console.log(this.state.products);
    return (
      <div className="wrapper productsWrapper">
        <button
          type="button"
          className="btn btn-primary popupButtonStyle"
          onClick={this.onAddProduct}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </button>
        <div className="tableStyleCustom products">
          <div key="0" className="tableHead">
            <div style={{ width: "15%", paddingLeft: "6px" }}>Name</div>
            <div style={{ width: "10%", paddingLeft: "6px" }}>
              Total Received
            </div>
            <div style={{ width: "10%", paddingLeft: "6px" }}>
              Total Shipped
            </div>
            <div style={{ width: "10%", paddingLeft: "6px" }}>Total onHand</div>
            <div style={{ width: "10%", paddingLeft: "6px" }}>Min Qty</div>
            <div style={{ width: "30%", paddingLeft: "6px" }}>Description</div>
            <div style={{ width: "15%", paddingLeft: "6px" }}>Supplier</div>
          </div>
          <div className="resultWrapper">
            {this.state.products.map(function(item, idx) {
              return (
                <div key={idx} className="tableItemStyleCustom">
                  <div style={{ width: "15%", paddingLeft: "6px" }}>
                    {item.productName}
                  </div>
                  <div style={{ width: "10%", paddingLeft: "6px" }}>
                    {item.inventoryReceived}
                  </div>
                  <div style={{ width: "10%", paddingLeft: "6px" }}>
                    {item.inventoryShipped}
                  </div>
                  <div style={{ width: "10%", paddingLeft: "6px" }}>
                    {item.inventoryOnHand}
                  </div>
                  <div style={{ width: "10%", paddingLeft: "6px" }}>
                    {item.minInventoryReq}
                  </div>
                  <div style={{ width: "30%", paddingLeft: "6px" }}>
                    {item.productDesc}
                  </div>
                  <div style={{ width: "15%", paddingLeft: "6px" }}>
                    {item.supplierName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          show={this.state.modalToggle}
          title={"Add Products"}
          close={this.popupClose.bind(this)}
          onSubmit={this.persistInBackend.bind(this)}
        >
          <form>
            <div className="form-group">
              <div>
                <label>Product Name</label>
                <input
                  type="text"
                  className={
                    this.state.validations.productNameValid
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Enter name"
                  value={this.state.addProduct.productName}
                  onChange={evt => this.handleChange(evt, "name")}
                />
                <div className="invalid-feedback">"Product Name Required"</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <label>Select Supplier</label>
                <select
                  className={
                    this.state.validations.supplierValid
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  data-live-search="true"
                  value={this.state.addProduct.supplierID}
                  onChange={evt => this.handleChange(evt, "supplierID")}
                >
                  {this.state.suppliers.map(function(item, idx) {
                    return (
                      <option key={idx} value={item.supplierId}>
                        {item.supplierName}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">"Select a supplier"</div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <label>Product Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter Description"
                  value={this.state.addProduct.productDesc}
                  onChange={evt => this.handleChange(evt, "productDesc")}
                ></textarea>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ marginRight: "5px" }}>
                  <label>On Hand</label>
                  <input
                    type="text"
                    className={
                      this.state.validations.onHandValid
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="Enter On Hand quantity"
                    value={this.state.addProduct.inventoryOnHand}
                    onChange={evt => this.handleChange(evt, "inventoryOnHand")}
                  />
                  <div className="invalid-feedback">
                    "Value should be greater than min Quantity and not zero"
                  </div>
                </div>
                <div>
                  <label>Min Quantity</label>
                  <input
                    type="text"
                    className={
                      this.state.validations.onMinQtyValid
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    placeholder="Enter Min Quantity"
                    value={this.state.addProduct.minInventoryReq}
                    onChange={evt => this.handleChange(evt, "minInventoryReq")}
                  />
                  <div className="invalid-feedback">
                    "Min Quantity cannot be should not be zero"
                  </div>
                </div>
              </div>
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
        let addProduct = Object.assign({}, prevState.addProduct);
        addProduct.productName = e.target.value;
        console.log(addProduct);
        return { addProduct };
      });
    } else if (type == "supplierID") {
      e.persist();
      this.setState(prevState => {
        let addProduct = Object.assign({}, prevState.addProduct);
        addProduct.supplierID = e.target.value;
        console.log(addProduct);
        return { addProduct };
      });
    } else if (type == "productDesc") {
      e.persist();
      this.setState(prevState => {
        let addProduct = Object.assign({}, prevState.addProduct);
        addProduct.productDesc = e.target.value;
        console.log(addProduct);
        return { addProduct };
      });
    } else if (type == "inventoryOnHand") {
      e.persist();
      if (this.validateField(e)) {
        this.setState(prevState => {
          let addProduct = Object.assign({}, prevState.addProduct);
          addProduct.inventoryOnHand = e.target.value;
          console.log(addProduct);
          return { addProduct };
        });
      }
    } else if (type == "minInventoryReq") {
      e.persist();
      if (this.validateField(e)) {
        this.setState(prevState => {
          let addProduct = Object.assign({}, prevState.addProduct);
          addProduct.minInventoryReq = e.target.value;
          console.log(addProduct);
          return { addProduct };
        });
      }
    }
  };

  validateField(e) {
    const re = /^[0-9\b]+$/;
    return e.target.value === "" || re.test(e.target.value);
  }
  validateAddProduct() {
    let valid = true;
    if (this.state.addProduct.productName == "") {
      valid = false;
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.productNameValid = false;
        return { validations };
      });
    } else {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.productNameValid = true;
        return { validations };
      });
    }
    if (this.state.addProduct.supplierID == "") {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.supplierValid = false;
        return { validations };
      });
      valid = false;
    } else {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.supplierValid = true;
        return { validations };
      });
    }
    if (!parseInt(this.state.addProduct.inventoryOnHand) > 0) {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.onHandValid = false;
        return { validations };
      });
      valid = false;
    } else {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.onHandValid = true;
        return { validations };
      });
    }
    if (!parseInt(this.state.addProduct.minInventoryReq) > 0) {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.onMinQtyValid = false;
        return { validations };
      });

      valid = false;
    } else {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.onMinQtyValid = true;
        return { validations };
      });
    }
    if (
      parseInt(this.state.addProduct.inventoryOnHand) <
      parseInt(this.state.addProduct.minInventoryReq)
    ) {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.onHandValid = false;
        return { validations };
      });

      valid = false;
    }
    if (valid) {
      this.setState(prevState => {
        let validations = prevState.validations;
        validations.onHandValid = true;
        validations.onMinQtyValid = true;
        validations.productNameValid = true;
        validations.supplierValid = true;
        return { validations };
      });
    }
    return valid;
  }

  persistInBackend() {
    console.log(this.state.addProduct);
    if (this.validateAddProduct()) {
      let addProductTemp = Object.assign({}, this.state.addProduct);
      addProductTemp.inventoryReceived = addProductTemp.inventoryOnHand;
      this.setState(
        {
          addProduct: addProductTemp
        },
        () => {
          this.popupClose();
          this.productService
            .createProduct(this.state.addProduct)
            .then(data => {
              this.setState(prevState => {
                let products = [];
                let addProduct = Object.assign({}, prevState.addProduct);
                products = products.concat(prevState.products);
                products.push(addProduct);
                this.clearState();
                console.log(this.state);
                return { addProduct, products };
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      );
    }
  }

  clearState() {
    this.setState(prevState => {
      let addProduct = Object.assign({}, prevState.addProduct);
      addProduct = this.createDummyProduct();
      let validations = Object.assign({}, prevState.validations);
      validations = this.createValidations();
      return { addProduct, validations };
    });
  }
  onAddProduct = e => {
    this.clearState();
    this.setSupplier(this.state.suppliers);
    console.log(this.state);
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

  getProducts() {
    this.productService
      .getProducts()
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  setSupplier(data) {
    if (data.length > 0) {
      let temp = Object.assign({}, this.state.addProduct);
      temp.supplierID = data[0].supplierId;
      temp.supplierName = data[0].supplierName;
      this.setState({ suppliers: data, addProduct: temp });
    }
  }
  getSuppliers() {
    this.supplierService
      .getSuppliers()
      .then(data => {
        if (data.length > 0) {
          this.setSupplier(data);
          console.log(this.state);
        } else {
          this.setState({ suppliers: data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Product;
