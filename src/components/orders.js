import React, { Component } from "react";

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
class Orders extends Component {
  state = {};

  constructor() {
    super();
    this.state = {
      orders: this.createOrders(),
      modalToggle: false,
      addOrder: new OrderModel(new Array(), "", 1)
    };
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    console.log("rendering");
    console.log(this.state.suppliers);
    return (
      <div className="orders">
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
                      {order.orderItems.map(function(item, idx) {
                        return (
                          <div key={idx} className="tableItemStyleCustom">
                            <div className="customWidth customWidthSerial">
                              {idx + 1 + ")"}
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
                      {order.customerName}
                    </span>
                  </div>
                  <div className="orderNo">
                    <span className="orderNoChild orderNoHead">
                      {"Order Number"}
                    </span>
                    <span className="orderNoChild orderNoDetail">
                      {order.orderNumber}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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

  // persistInBackend() {
  //   console.log(this.state.addSupplier.name);
  //   console.log(this.state.addSupplier.address);
  //   this.popupClose();
  //   this.setState(prevState => {
  //     let suppliers = [];
  //     let addSupplier = Object.assign({}, prevState.addSupplier);
  //     suppliers = suppliers.concat(prevState.suppliers);
  //     suppliers.push(new SupplierModel(addSupplier.name, addSupplier.address));
  //     addSupplier.address = "";
  //     addSupplier.name = "";
  //     console.log(this.state);
  //     return { addSupplier, suppliers };
  //   });
  // }

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
}

export default Orders;
