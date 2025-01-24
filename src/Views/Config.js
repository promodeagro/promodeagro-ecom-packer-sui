const BASE_URL = "https://bytud12spg.execute-api.ap-south-1.amazonaws.com";

const Config = {
  BASE_URL,
  FETCH_ORDERS: `${BASE_URL}/packer/order/6679942e-ab1e-4de1-8b1b-382a3ed9a044`,
   FETCH_PACKEDORDERS:`${BASE_URL}/packer/order/6679942e-ab1e-4de1-8b1b-382a3ed9a044`,
   FETCH_ORDERSDETAILs_BY_ID:`${BASE_URL}/packer/order/6679942e-ab1e-4de1-8b1b-382a3ed9a044`,
  AUTH_USER:`${BASE_URL}/auth/signin`,
  SIGNUP:`${BASE_URL}/auth/signup`,
  SIGNOUT:`${BASE_URL}/auth/signout`,
  FORGOT_PASSSWORD:`${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD:`${BASE_URL}/auth/reset-password`,

};

export default Config;
