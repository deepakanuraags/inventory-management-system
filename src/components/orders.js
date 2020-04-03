import React, { Component } from "react";
import { CustomerService } from "../services/customer-service";
import { ProductService } from "../services/product-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "./reusable/modal";
import { OrderService } from "../services/order-service";

class OrderItemModel {
  productName;
  quantity;
  constructor(productName, quantity) {
    this.productName = productName;
    this.quantity = quantity;
  }
}

class OrderModel {
  orderItems;
  customerName;
  orderNumber;
  constructor(orderItems, customerName, orderNumber) {
    this.orderItems = orderItems;
    this.customerName = customerName;
    this.orderNumber = orderNumber;
  }
}
class ProductOrderModel {
  productId;
  productName;
  quantity;
  isProductInValid;
  isProductQtyInValid;
  constructor(productId, productName, quantity) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.isProductInValid = false;
    this.isProductQtyInValid = false;
  }
}
class customerModel {
  customerId;
  customerName;
  isCustomerInvalid;
  constructor(customerId, customerName) {
    this.customerId = customerId;
    this.customerName = customerName;
    this.isCustomerInvalid = false;
  }
}

class OrderPostModel {
  customer;
  product;
  constructor() {
    this.customer = new customerModel("", "");
    this.product = [];
  }
}
class Orders extends Component {
  state = {};
  customerService = new CustomerService();
  productService = new ProductService();
  orderService = new OrderService();
  constructor() {
    super();
    this.state = {
      orders: [],
      customers: [],
      products: [],
      modalToggle: false,
      addOrder: new OrderPostModel()
    };
    this.getCustomers();
    this.getProducts();
    this.getOrders();
    this.handleChange = this.handleChange.bind(this);
    this.onDeleteProduct = this.onDeleteProduct.bind(this);
  }
  render() {
    console.log("rendering");
    console.log(this.state.suppliers);
    return (
      <div className="wrapper orders">
        <button
          type="button"
          className="btn btn-primary popupButtonStyle"
          onClick={this.onAddNewOrder}
        >
          <FontAwesomeIcon icon={faPlus} /> Place New Order
        </button>
        <div className="ordersList">
          {this.state.orders.map(function(order, idx) {
            return (
              <div key={idx} className="orderItem">
                <div className="orderItemList">
                  <div className="tableStyleCustom">
                    <div className="tableHead">
                      <div className="customWidth customWidthSerial"></div>
                      <div className="customWidth">Product Name</div>
                      <div className="customWidth">Quantity</div>
                    </div>
                    <div className="resultWrapper">
                      {order.product.map(function(item, idx1) {
                        return (
                          <div key={idx1} className="tableItemStyleCustom">
                            <div className="customWidth customWidthSerial">
                              {idx1 + 1 + ")"}
                            </div>
                            <div className="customWidth">
                              {item.productName}
                            </div>
                            <div className="customWidth">{item.quantity}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="orderOwner">
                  <div className="customerName">
                    <span className="customerNameChild customerNameHead">
                      {"Customer"}
                    </span>
                    <span className="customerNameChild customerNameDetail">
                      {order.customer.customerName}
                    </span>
                  </div>
                  <div className="orderNo">
                    <span className="orderNoChild orderNoHead">
                      {"Order Number"}
                    </span>
                    <span className="orderNoChild orderNoDetail">
                      {order.order.orderId}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Modal
          show={this.state.modalToggle}
          title={"Create Order"}
          close={this.popupClose.bind(this)}
          onSubmit={this.persistInBackend.bind(this)}
        >
          <form>
            <div className="form-group">
              <div style={{ marginTop: "10px", maxWidth: "300px" }}>
                <label>Select Customer</label>
                <select
                  className={
                    this.state.addOrder.customer.isCustomerInvalid
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  data-live-search="true"
                  value={this.state.addOrder.customer.customerId}
                  onChange={evt => this.handleChange(evt, "customerId")}
                >
                  <option key="default" selected>
                    Select a customer
                  </option>
                  {this.state.customers.map(function(item, idx) {
                    return (
                      <option key={idx} value={item.customerId}>
                        {item.customerName}
                      </option>
                    );
                  })}
                </select>
                <div className="invalid-feedback">Select a Customer</div>
              </div>
              <div className="productList">
                {this.state.addOrder.product.map((item, idx) => {
                  return (
                    <div key={idx} style={{ marginTop: "10px" }}>
                      <div className="productRow">
                        <div style={{ marginTop: "10px", minWidth: "250px" }}>
                          {idx == 0 ? <label>Select Product</label> : null}
                          <select
                            className={
                              item.isProductInValid
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            data-live-search="true"
                            value={item.productId}
                            onChange={evt =>
                              this.handleChange(evt, {
                                product: item,
                                type: "productId",
                                idx: idx
                              })
                            }
                          >
                            <option key="default" selected>
                              Select a product
                            </option>
                            {this.state.products.map((item1, idx1) => {
                              return (
                                <option key={idx1} value={item1.productId}>
                                  {item1.productName}
                                </option>
                              );
                            })}
                          </select>
                          <div className="invalid-feedback">
                            Select an unique and valid product
                          </div>
                        </div>
                        <div style={{ marginTop: "10px", marginLeft: "5px" }}>
                          {idx == 0 ? <label>Quantity</label> : null}
                          <input
                            type="text"
                            className={
                              item.isProductQtyInValid
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            placeholder="Enter Quantity"
                            value={item.quantity}
                            onChange={evt =>
                              this.handleChange(evt, {
                                type: "quantity",
                                product: item,
                                idx: idx
                              })
                            }
                          />
                          <div className="invalid-feedback">
                            Entered quantity should be greater than zero and on
                            hand quantity
                          </div>
                        </div>
                        <div
                          style={
                            idx == 0
                              ? { marginTop: "49px", marginLeft: "8px" }
                              : { marginTop: "16px", marginLeft: "8px" }
                          }
                          disabled={
                            this.state.addOrder.product.length == 1
                              ? true
                              : false
                          }
                        >
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faTrashAlt}
                            onClick={() => {
                              this.onDeleteProduct(idx);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  style={{ marginTop: "10px" }}
                  type="button"
                  className="btn btn-primary footerButton"
                  onClick={this.addNewProduct}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Product
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
  onDeleteProduct = idx => {
    let addOrder = Object.assign({}, this.state.addOrder);
    addOrder.product.splice(idx, 1);
    this.setState({
      addOrder: addOrder
    });
  };
  validate() {
    let addOrder = Object.assign({}, this.state.addOrder);
    if (!addOrder.customer.customerId) {
      addOrder.customer.isCustomerInvalid = true;
    }
    addOrder.product.forEach(product => {
      if (!product.productId) {
        product.isProductInValid = true;
      } else {
        let OtherMatchingProducts = addOrder.product.filter(
          prod => prod.productId == product.productId
        );
        if (OtherMatchingProducts.length > 1) {
          product.isProductInValid = true;
        }
        let productFromDB = this.state.products.find(
          prod => prod.productId == product.productId
        );
        if (
          parseInt(product.quantity) <= 0 ||
          parseInt(product.quantity) > productFromDB.inventoryOnHand
        ) {
          product.isProductQtyInValid = true;
        }
      }
    });
    this.setState({
      addOrder: addOrder
    });
    if (
      addOrder.customer.isCustomerInvalid ||
      addOrder.product.some(
        product => product.isProductInValid || product.isProductQtyInValid
      )
    ) {
      return false;
    } else {
      return true;
    }
  }
  handleChange = (e, type) => {
    if (type == "customerId") {
      e.persist();
      var type = type;
      this.setState(prevState => {
        let addOrder = Object.assign({}, prevState.addOrder);
        let customer = addOrder.customer;
        customer.customerId = e.target.value;
        customer.isCustomerInvalid = false;
        customer.customerName = prevState.customers.find(
          cust => cust.customerId == e.target.value
        ).customerName;
        console.log(addOrder);
        return { addOrder };
      });
    } else if (type instanceof Object && type.type == "quantity") {
      e.persist();
      var type = type;
      this.setState(prevState => {
        let addOrder = Object.assign({}, prevState.addOrder);
        let product = addOrder.product[type.idx];
        product.quantity = e.target.value;
        product.isProductQtyInValid = false;
        console.log(addOrder);
        return { addOrder };
      });
    } else if (type instanceof Object && type.type == "productId") {
      e.persist();
      this.setState(prevState => {
        let addOrder = Object.assign({}, prevState.addOrder);
        let product = addOrder.product[type.idx];
        product.productId = e.target.value;
        product.isProductInValid = false;
        product.productName = prevState.products.find(
          product => product.productId == e.target.value
        ).productName;
        console.log(product);
        console.log(addOrder);
        return { addOrder };
      });
    }
  };

  onAddNewOrder = e => {
    this.clearState();
    this.setCustomer();
    this.setProduct();
    e.preventDefault();
    setTimeout(() => {
      this.setState({
        modalToggle: true
      });
    }, 200);
  };

  addNewProduct = e => {
    this.setProduct();
  };

  persistInBackend() {
    if (this.validate()) {
      this.setState({
        modalToggle: false
      });
      this.orderService.createOrder(this.state.addOrder).then(data => {
        console.log(data);
        this.getOrders();
      });
    }
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

  createOrderItems() {
    var orderItems = new Array();
    for (var j = 0; j < 5; j++) {
      orderItems.push(new OrderItemModel("Cake", 7));
    }
    return orderItems;
  }

  createOrders() {
    var orders = new Array();
    for (var j = 0; j < 5; j++) {
      orders.push(new OrderModel(this.createOrderItems(), "Deepak", j));
    }
    return orders;
  }

  getOrders() {
    this.orderService.getOrders().then(data => {
      data = data.reverse();
      this.setState({
        orders: data
      });
    });
  }
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

  clearState() {
    this.setState(prevState => {
      let addOrder = Object.assign({}, prevState.addOrder);
      addOrder = new OrderPostModel();
      return { addOrder };
    });
  }

  setCustomer() {
    this.setState(prevState => {
      let addOrder = Object.assign({}, prevState.addOrder);
      if (prevState.customers.length > 0) {
        addOrder.customer = new customerModel();
      }
      return { addOrder };
    });
  }

  setProduct() {
    this.setState(prevState => {
      let addOrder = Object.assign({}, prevState.addOrder);
      if (prevState.products.length > 0) {
        addOrder.product.push(new ProductOrderModel(undefined, undefined, 0));
      }
      return { addOrder };
    });
  }
}

export default Orders;
