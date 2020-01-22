const base = function() {
  if (process.env.NODE_ENV === "development") {
    return "https://dev.api.adabiriyadh.sa";
  } else if (process.env.NODE_ENV === "online_dev") {
    return "https://dev.api.adabiriyadh.sa";
  } else if (process.env.NODE_ENV === "testing") {
    return "https://test.api.adabiriyadh.sa";
  } else if (process.env.NODE_ENV === "production") {
    return "https://api.adabiriyadh.sa";
  }
};
export const baseURL = base();
