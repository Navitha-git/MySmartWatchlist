// import { authenticator } from "otplib";
import axios from "axios";

export const authenticateSmartAPI = () => {
  const token = window.otplib.authenticator.generate(
    "VPDUHM3EO6VUBAUS6IBESGJDCM"
  );
  console.log("TOTP:" + token);
  var data = JSON.stringify({
    clientcode: "A839486",
    password: "1004",
    totp: token,
  });

  var config = {
    method: "post",
    url: "https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-UserType": "USER",
      "X-SourceID": "WEB",
      "X-ClientLocalIP": "192.168.0.104",
      "X-ClientPublicIP": "103.117.38.183",
      "X-MACAddress": "74-DF-BF-3F-6C-9B",
      "X-PrivateKey": "f258qBfF",
    },
    data: data,
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
