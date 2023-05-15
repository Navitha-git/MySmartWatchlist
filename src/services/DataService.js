// import { authenticator } from "otplib";
import axios from "axios";

export const getLTP = (token, dataNew) => {
  var data = JSON.stringify({
    exchange: "NSE",
    tradingsymbol: "SBIN-EQ",
    symboltoken: "3045",
  });
  const local_token = "Bearer " + token;
  var config = {
    method: "post",
    url: "https://apiconnect.angelbroking.com/order-service/rest/secure/angelbroking/order/v1/getLtpData",
    headers: {
      "Content-Type": "application/json",
      authorization: local_token,
      accept: "application/json",
      "X-UserType": "USER",
      "X-SourceID": "WEB",
      "X-ClientLocalIP": "192.168.0.104",
      "X-ClientPublicIP": "103.117.38.134",
      "X-MACAddress": "C0-25-E9-27-13-0A",
      "X-PrivateKey": "f258qBfF",
    },
    data: dataNew ? dataNew : data,
  };
  return axios(config);
  // .then((response) => {
  //   console.log("AUTH_SUCC: " + JSON.stringify(response.data));
  //   return response.data.data.jwtToken;
  // })
  // .catch((error) => {
  //   console.log("AUTH_ERR" + error);
  // });
};
