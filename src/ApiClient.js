//axios handles api operation get set delete on the database
import axios from "axios";

export class ApiClient {
  status(response) {
    //code in this range are typically good responses
    if (response.status >= 200 && response.status < 300) {
      //say it is resovled
      return Promise.resolve(response);
    } else {
      //returns Error object as text i.e 404 Not found
      return Promise.reject(new Error(response.statusText));
    }
  }

  getPayout(hotspot, startDate, endDate) {
    // console.log("hotspot", hotspot);
    // console.log("hotspot name", hotspot.name);
    // console.log("start date", startDate);
    // console.log("end date", endDate);
    return this.getRequest(
      `https://api.helium.io/v1/hotspots/${hotspot.address}/rewards/sum?max_time=${endDate}T23:59:59Z&min_time=${startDate}T00:00:00Z`
    );
  }

  getHotspots(account) {
    return this.getRequest(
      `https://api.helium.io/v1/accounts/${account.address}/hotspots`
    );
  }

  getHelium() {
    return this.getRequest(
      `https://api.coingecko.com/api/v3/simple/price?ids=helium&vs_currencies=gbp`
    );
  }

  runSearch(input) {
    return this.getRequest(
      `https://api.helium.io/v1/hotspots/name?search=${input}`
    );
  }

  getRequest(url) {
    return axios
      .get(url)
      .then(this.status)
      .catch(function (error) {
        // handle error
        console.error(error);
        // alert(error)
      });
  }
}
