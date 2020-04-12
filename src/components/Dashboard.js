import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ProductService } from "../services/product-service";
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
class Dashboard extends Component {
  state = {};
  productService = new ProductService();
  supplyLogService = new SupplyLogService();
  constructor() {
    super();
    this.state = {
      options: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: {
          text: "Product Distribution"
        },
        tooltip: {
          pointFormat: "<b>{point.name}</b> <br>inventoryOnHand:{point.y}"
        },
        accessibility: {
          point: {
            valueSuffix: "%"
          }
        },
        lang: {},
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b> <br>inventoryOnHand:{point.y}"
            }
          }
        },
        series: [
          {
            name: "Products",
            colorByPoint: true,
            data: []
          }
        ],
        credits: {
          enabled: false
        }
      },
      supplyLogs: []
    };
    this.getProducts();
    this.getSupplyLogs();
  }

  render() {
    return (
      <div className="wrapper dashboardWrapper">
        <div className="graph">
          <div className="graphCenter">
            {this.state.options.series[0].data.length > 0 ? (
              <HighchartsReact
                className="graph"
                highcharts={Highcharts}
                options={this.state.options}
              />
            ) : (
              <div className="noData">No Products in Database</div>
            )}
          </div>
        </div>
        <div
          className={
            this.state.supplyLogs.length > 0
              ? "activeSupplyOrders"
              : "activeSupplyOrders centerAlign"
          }
        >
          {this.state.supplyLogs.length > 0 ? (
            <div class="supplyOrderWrapperDashBoard">
              <div className="title">Active Supply Orders</div>
              {this.state.supplyLogs.map(function(supply, idx) {
                return (
                  <div key={idx} className="supplyLog dashBoardSupplyLog">
                    <div className="supplyLogColumn">
                      <div className="supplyLogColumnHeader">Supplier</div>
                      <div className="supplyLogColumValue">
                        {supply.supplierName}
                      </div>
                    </div>
                    <div className="supplyLogColumn">
                      <div className="supplyLogColumnHeader">Product</div>
                      <div className="supplyLogColumValue">
                        {supply.productName}
                      </div>
                    </div>
                    <div className="supplyLogColumn">
                      <div className="supplyLogColumnHeader">Ordered At</div>
                      <div className="supplyLogColumValue">
                        {supply.orderedAtUI}
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </div>
          ) : (
            <div className="noData">No Active Supply Orders in Database</div>
          )}
        </div>
      </div>
    );
  }

  getProducts() {
    this.productService
      .getProducts()
      .then(data => {
        let series = [];
        data.forEach(prod => {
          let product = { name: prod.productName, y: prod.inventoryOnHand };
          series.push(product);
        });
        this.setState(prevState => {
          let options = Object.assign({}, prevState.options);
          options.series[0].data = series;
          return { options };
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSupplyLogs() {
    this.supplyLogService
      .getSupplyLogService()
      .then(data => {
        let supplyLogs = [];
        data.forEach(supply => {
          if (!supply.arrivedAt) {
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
          }
        });
        this.setState({ supplyLogs: supplyLogs });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Dashboard;
