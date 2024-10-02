const BASE_URL = "https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com";
const BASE_URL2 = "https://lou294nkli.execute-api.us-east-1.amazonaws.com";
const Config = {
  BASE_URL,

  FETCH_ORDERS: `${BASE_URL}/dev/getAllUnpackedOrders`,
   FETCH_PACKEDORDERS:`${BASE_URL}/dev/getAllPackedOrders`,
   FETCH_ORDERSDETAILs_BY_ID:`${BASE_URL}/dev/OrderDetails`,
  AUTH_USER:`${BASE_URL2}/auth/signin`,
  SIGNUP:`${BASE_URL2}/auth/signup`,
  SIGNOUT:`${BASE_URL2}/auth/signout`,
  FORGOT_PASSSWORD:`${BASE_URL2}/auth/forgot-password`,
  RESET_PASSWORD:`${BASE_URL2}/auth/reset-password`,

};

export default Config;
