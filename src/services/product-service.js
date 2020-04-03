import config from "../config/config.json";

export class ProductService {
  getProducts() {
    return new Promise((resolve, reject) => {
      fetch(config.backendUrl + "OrderList")
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  createProduct(product) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
      };
      fetch(config.backendUrl + "createProd", requestOptions)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
}
