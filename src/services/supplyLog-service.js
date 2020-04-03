import config from "../config/config.json";

export class SupplyLogService {
  getSupplyLogService() {
    return new Promise((resolve, reject) => {
      fetch(config.backendUrl + "SupplyingLogs")
        .then(res => res.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  updateSupplyLog(supplyLog) {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplyLog)
      };
      fetch(config.backendUrl + "updateSupplying", requestOptions)
        .then(data => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
}
