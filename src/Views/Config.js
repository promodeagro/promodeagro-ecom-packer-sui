const LOCAL_AUTH_BASE_URL = "http://localhost:3000/dev";

const Config = {
  // Auth
  AUTH_USER: `${LOCAL_AUTH_BASE_URL}/login`,
  SIGNUP: `${LOCAL_AUTH_BASE_URL}/signup`, // If you have a signup endpoint
  SIGNOUT: `${LOCAL_AUTH_BASE_URL}/logout`,
  FORGOT_PASSSWORD: `${LOCAL_AUTH_BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${LOCAL_AUTH_BASE_URL}/reset-password`,
  VERIFY_OTP: `${LOCAL_AUTH_BASE_URL}/verify-otp`,

  // Orders
  ORDERS_UNPACKED: `${LOCAL_AUTH_BASE_URL}/orders/unpacked`,
  ORDERS_PACKED: `${LOCAL_AUTH_BASE_URL}/orders/packed`,
  ORDER_DETAILS: `${LOCAL_AUTH_BASE_URL}/orders/start`, // Usage: /orders/start/{order_id}
  ORDER_COMPLETE: `${LOCAL_AUTH_BASE_URL}/orders/complete`,

  // Notifications
  NOTIFICATIONS: `${LOCAL_AUTH_BASE_URL}/notifications`, // Usage: ?user_id=USER_ID

  // Profile
  PROFILE: `${LOCAL_AUTH_BASE_URL}/profile`, // Usage: ?user_id=USER_ID
  PROFILE_UPDATE: `${LOCAL_AUTH_BASE_URL}/profile/update`,
  PROFILE_CHANGE_PASSWORD: `${LOCAL_AUTH_BASE_URL}/profile/change-password`,
};

export default Config;
