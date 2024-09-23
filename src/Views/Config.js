const BASE_URL = "https://7fy0psdjel.execute-api.us-east-1.amazonaws.com/dev";

const Config = {
  BASE_URL,
  // GET_UNPACKEDORDERS:`${BASE_URL}/getAllUnpackedOrders`,
  FETCH_QUOTATIONS: `${BASE_URL}/users`,
  FINISH_PRODUCT_SPECIFICATIONS: `${BASE_URL}/users`,
  FINISH_PRODUCT_VIEW_ATACHMENTS: `${BASE_URL}/users`,
  FINISH_PRODUCT_DETAILS: `${BASE_URL}/users`,
  FETCH_ORDERS: "https://7fy0psdjel.execute-api.us-east-1.amazonaws.com/dev/getAllUnpackedOrders",
  // FETCH_FILTER_ORDERS: `${BASE_URL}/order`, // Ensure this is used correctly in the code
  // SEARCH_ORDER_BY_ID: `${BASE_URL}/order`,  
  ORDERS_DETAILS:`${BASE_URL}/order/{id}`,
  UPDATE_ORDER_STATUS:`${BASE_URL}/order/proceed?ids=`,
  ASSIGN_DELIVERY_BOY: `${BASE_URL}/order/proceed?ids=`, // Will append `&assignee={assignee}` dynamically
  UPDATE_SINGLE_ORDER_STATUS:`${BASE_URL}/order/proceed?ids=`,
  ASSIGN_DELIVERY_BOY_SINGLEORDER: `${BASE_URL}/order/proceed?ids=`, // Will append `&assignee={assignee}` dynamically
  ORDERS_STATUS:`${BASE_URL}/order/stats`,
  ORDERS_VIEWATTACHMENTS:`${BASE_URL}/users`,
   FETCH_BATCH_SHEET:`${BASE_URL}/users`,
   FETCH_PRODUCTS:`${BASE_URL}/inventory`,
   FETCH_PRODUCTS_DETAIL:`${BASE_URL}/inventory`,
   PUT_PRODUCTS_DETAIL:`${BASE_URL}/publish`,
   PUT_PRICING:`${BASE_URL}/inventory`,
   PUT_ACTIVE_INACTIVE:`${BASE_URL}/inventory/status`,
   FETCH_RAW_MATERIALS:`${BASE_URL}/users`,
   FETCH_PURCHASE_ORDER:`${BASE_URL}/users`,
   FETCH_PURCHASE_REQUSTION_LIST:`${BASE_URL}/users`,
   VENDOR_PROFILE:`${BASE_URL}/users`,
   FETCH_CUSTOMER:`${BASE_URL}/user`,
   AUTH_USER:`${BASE_URL}/auth/signin`,
   SIGNUP:`${BASE_URL}/auth/signup`,
   FORGOT_PASSSWORD:`${BASE_URL}/auth/forgot-password`,
   RESET_PASSWORD:`${BASE_URL}/auth/reset-password`,
};

export default Config;
