import config from "../config/config.json";

export class OrderService {
  createOrder(order) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      };
      fetch(config.backendUrl + "createOrders", requestOptions)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  getOrders() {
    return new Promise((resolve, reject) => {
      fetch(config.backendUrl + "getOrders")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  createSupplier(data) {}
}
