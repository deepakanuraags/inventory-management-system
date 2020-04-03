import config from "../config/config.json";

export class SupplierService {
  getSuppliers() {
    return new Promise((resolve, reject) => {
      fetch(config.backendUrl + "SupplierList")
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  createSupplier(data) {}
}
