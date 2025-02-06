import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    Accept: "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error in API response: ", error.response.data);
      if (error.response.status === 401) {
        alert("Authentication error. Please check your API key.");
      }
    } else if (error.request) {
      console.error("No response was received from API: ", error.request);
    } else {
      console.error(
        "Error in the configuration of the application: ",
        error.message,
      );
    }
    return Promise.reject(error);
  },
);

export default apiClient;
