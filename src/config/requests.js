const base = function() {
  if (process.env.NODE_ENV === "development") {
    return "https://dev.api.solutionplus.net";
  } else if (process.env.NODE_ENV === "online_dev") {
    return "https://dev.api.solutionplus.net";
  } else if (process.env.NODE_ENV === "testing") {
    return "https://test.api.solutionplus.net";
  } else if (process.env.NODE_ENV === "production") {
    return "https://api.solutionplus.net";
  }
};
export const baseURL = base();
