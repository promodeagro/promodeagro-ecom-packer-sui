import axios from "axios";
import config from "Views/Config";

// import { ToastMessage } from "Toast/ToastMessage";
// import { getCurrentOrgId } from "Utils";

const service = axios.create({
  BASE_URL: config.BASE_URL,
  timeout: 60000,
});

service.interceptors.request.use(
  (request) => {
    // const jwtToken = localStorage.getItem(AUTH_TOKEN);

    // if (jwtToken) {
    //   config.headers[TOKEN_PAYLOAD_KEY] = `token ${jwtToken}`;
    // }

    // if (
    //   !jwtToken &&
    //   Object.prototype.hasOwnProperty.call(
    //     config.headers,
    //     PUBLIC_REQUEST_KEY
    //   ) &&
    //   !config.headers[PUBLIC_REQUEST_KEY]
    // ) {
    //   history.push(ENTRY_ROUTE);
    //   window.location.reload();
    // }
    return request;
  },
  (error) => {
    // Do something with request error here
    // ToastMessage.error("Error");
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Remove token and redirect
    // if (error?.response?.status) {
    //   // let message = "";
    //   if (error.response.status === 400 || error.response.status === 403) {
    //     // message = "Authentication failed";
    //     // Handle logout
    //   }

    //   if (error.response.status === 404) {
    //     // message = "Not Found";
    //   }

    //   if (error.response.status === 500) {
    //     // message = "Error";
    //   }

    //   if (error.response.status === 508) {
    //     // message = "Time Out";
    //   }
    //   // ToastMessage.error("Error");
    // }

    return Promise.reject(error);
  }
);

const authService = axios.create({
  BASE_URL: config.BASE_URL,
  timeout: 60000,
});

authService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { service as postLoginService };
export { authService as preLoginService };
