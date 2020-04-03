import config from "../config/config.json";

export class CustomerService {
  getCustomers() {
    return new Promise((resolve, reject) => {
      fetch(config.backendUrl + "CustomerList")
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  createCustomer(customer) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
      };
      fetch(config.backendUrl + "createCustomer", requestOptions)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
}
