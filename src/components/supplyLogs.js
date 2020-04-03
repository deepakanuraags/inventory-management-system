import React, { Component } from "react";
import config from "../config/config.json";
import { SupplyLogService } from "../services/supplyLog-service";
import Moment from "moment";
class SupplyingModel {
  arrivesAt;
  arriversAtUI;
  orderedAt;
  orderedAtUI;
  productId;
  quantity;
  supplierId;
  supplierName;
  productName;
  supplyingId;
  arrivedAt;
  arrivedAtUI;
  checked;
  constructor(
    arrivesAt,
    orderedAt,
    productId,
    quantity,
    supplierId,
    supplierName,
    productName,
    supplyingId,
    arrivedAt,
    checked
  ) {
    this.arrivesAt = arrivesAt;
    this.arrivesAtUI = Moment(arrivesAt).format("MMM Do, YYYY");
    this.orderedAt = orderedAt;
    this.orderedAtUI = Moment(orderedAt).format("MMM Do, YYYY");
    this.productId = productId;
    this.quantity = quantity;
    this.supplierId = supplierId;
    this.supplierName = supplierName;
    this.productName = productName;
    this.supplyingId = supplyingId;
    this.arrivedAt = arrivedAt;
    this.arrivedAtUI = Moment(arrivedAt).format("MMM Do, YYYY");
    this.checked = checked;
  }
}

class SupplyLogs extends Component {
  supplyLogService = new SupplyLogService();
  state = {};

  constructor() {
    super();
    this.state = {
      supplyLogs: [],
      modalToggle: false
    };
    this.getSupplyLogs();
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    console.log("rendering");
    console.log(this.state.suppliers);
    return (
      <div className="wrapper supplyLogsWrapper">
        {this.state.supplyLogs.map((supply, idx) => {
          return (
            <div key={idx} className="supplyLog">
              <div className="supplyLogColumn">
                <div className="supplyLogColumnHeader">Supplier</div>
                <div className="supplyLogColumValue">{supply.supplierName}</div>
              </div>
              <div className="supplyLogColumn">
                <div className="supplyLogColumnHeader">Product</div>
                <div className="supplyLogColumValue">{supply.productName}</div>
              </div>
              <div className="supplyLogColumn">
                <div className="supplyLogColumnHeader">Ordered At</div>
                <div className="supplyLogColumValue">{supply.orderedAtUI} </div>
              </div>
              <div className="supplyLogColumn">
                <div className="supplyLogColumnHeader">Quantity</div>
                <div className="supplyLogColumValue">{supply.quantity}</div>
              </div>
              <div className="supplyLogColumn">
                <div className="supplyLogColumnHeader">
                  {supply.arrivedAt ? "Arrived At" : "Arrives At"}
                </div>
                <div className="supplyLogColumValue">
                  {supply.arrivedAt ? supply.arrivesAtUI : supply.arrivesAtUI}
                </div>
              </div>

              {supply.arrivedAt ? (
                <div className="supplyLogColumn checkbox-container purple">
                  <div className="supplyLogColumnHeader">Arrived</div>{" "}
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark__circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark__check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>{" "}
                </div>
              ) : (
                <div className="supplyLogColumn checkbox-container purple">
                  {" "}
                  <div className="supplyLogColumnHeader">Mark Arrived</div>
                  <input
                    type="checkbox"
                    id="toggle3"
                    checked={supply.checked}
                    onChange={evt => this.handleChange(idx)}
                  />
                  <label for="toggle3"></label>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  handleChange = idx => {
    let supplyLog = this.state.supplyLogs[idx];
    supplyLog.checked = true;
    let supplyLogs = this.state.supplyLogs;
    supplyLogs[idx] = supplyLog;
    this.setState({ supplyLogs: supplyLogs });
    setTimeout(() => {
      this.persistInBackend(supplyLog, idx);
    }, 500);
  };

  persistInBackend = (supplyLog, idx) => {
    this.supplyLogService.updateSupplyLog(supplyLog).then(() => {
      supplyLog.arrivedAt = Moment(new Date()).format("MMM Do, YYYY");
      supplyLog.checked = true;
      let supplyLogs = this.state.supplyLogs;
      supplyLogs[idx] = supplyLog;
      this.setState({ supplyLogs: supplyLogs });
    });
  };

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

  getSupplyLogs() {
    this.supplyLogService
      .getSupplyLogService()
      .then(data => {
        let supplyLogs = [];
        data.forEach(supply => {
          let model = new SupplyingModel(
            supply.arrivesAt,
            supply.orderedAt,
            supply.productId,
            supply.quantity,
            supply.supplierId,
            supply.supplierName,
            supply.productName,
            supply.supplyingId,
            supply.arrivedAt,
            supply.arrivedAt ? true : false
          );
          supplyLogs.push(model);
          console.log(model);
        });
        this.setState({ supplyLogs: supplyLogs });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default SupplyLogs;
