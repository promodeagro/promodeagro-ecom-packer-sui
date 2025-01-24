import axios from "axios";
import config from "Views/Config";
// import { ToastMessage } from "Toast/ToastMessage";
// import { getCurrentOrgId } from "Utils";

const TOKEN_PAYLOAD_KEY = "Authorization"; // Customize header key if needed
const PUBLIC_REQUEST_KEY = "Public-Request";

// Main Axios instance for authenticated requests
const service = axios.create({
  baseURL: config.BASE_URL, // Correctly set base URL
  timeout: 60000,
});

service.interceptors.request.use(
  (request) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve and parse 'user' object from local storage
    // const jwtToken = user?.accessToken; 
    // Extract accessToken if available
   const jwtToken='eyJraWQiOiIyUEsySUZRM3o4VGZjOFQrR0w4WFFOMmY0cDljRXpReEZRMFdwNUZLdDVVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjMTUzYWQ5YS1iMGIxLTcwZjUtOTYwNS0xMTZkYmJhNjMyMjMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX2VRQWlkVWVuciIsImNsaWVudF9pZCI6IjFiMjVzYTRvNHFvN3VtN2ZubWI2ZGlhZTU4Iiwib3JpZ2luX2p0aSI6ImNmNTc0NDI4LTUyZjItNDI0MS04NDk1LTUwYzY5ZTM4MWExZiIsImV2ZW50X2lkIjoiMmIyMWM5NjItYWFhMS00NDAwLTg0MDktZGFjMjhmMjZlZWVmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTczMzQ3ODg4OCwiZXhwIjoxNzMzNTY1Mjg4LCJpYXQiOjE3MzM0Nzg4ODgsImp0aSI6ImY0NWJiODkxLWU2NWUtNDY5MC04NGUxLWE1ZDc4MmU0MWI0OCIsInVzZXJuYW1lIjoiYzE1M2FkOWEtYjBiMS03MGY1LTk2MDUtMTE2ZGJiYTYzMjIzIn0.YmbiXsEQo7rYmo_7fCOadjKOBq3vvMElXnNyfmidUoMwVWZ8db8egR4hms7BxyiX2ml3KJqiPDm2WBJ8YtMTe_qbei5FWe4x9AgsoyupSIL-053EYFD41ZqmZSxGoM9EhCllQ_wROQ0CD1iMbU5zJzXaH65XSdoIOy-5LAeTFEUFlDUKVNFGGEAfTzRgErEnzEmQQUL8oaSc3FyeuGdAtYfEDCClHd3B_rjZyBFAv6Se_OF2Sgy5pWxfaXEUqSf2_UkQqADF3oYjhAwhMM96szPF0t2hmNhJTZw0Axda73yvIAmAU1l8TQ_6-7QBKIYUyaJZjBRT_UvbLRSOUIeqiQ'
    if (jwtToken) {
      request.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`; // Set token in request headers
    }

    if (
      !jwtToken &&
      request.headers.hasOwnProperty(PUBLIC_REQUEST_KEY) &&
      !request.headers[PUBLIC_REQUEST_KEY]
    ) {
      window.location.href = "/"; // Redirect if no token and request is not public
      window.location.reload();
    }
    return request;
  },
  (error) => {
    // Handle request error
    // ToastMessage.error("Request error");
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      
      // Redirect to login only if 401 status and not on login page
      if (status === 401 && window.location.pathname !== "/login") {
        localStorage.removeItem("user"); // Clear user data from local storage
        window.location.href = "/auth/signin"; // Redirect to login page
      } else if (status === 403) {
        // Optional: Handle Forbidden (403) separately if needed
        // ToastMessage.error("Access denied.");
      }
      // Optional: ToastMessage for other errors
      // ToastMessage.error("An error occurred");
    }
    return Promise.reject(error);
  }
);

// Axios instance for public routes (e.g., login requests)
const authService = axios.create({
  baseURL: config.BASE_URL,
  timeout: 60000,
});

authService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export { service as postLoginService };
export { authService as preLoginService };