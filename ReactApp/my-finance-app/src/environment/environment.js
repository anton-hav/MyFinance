export const environment = {
  production: false,
  apiUrl: "https://localhost:7074/api/",
  userEndpoint: "User",
  tokenEndpoints: {
    createToken: "Token",
    refreshToken: "Token/Refresh",
    revokeToken: "Token/Revoke",
    validateToken: "Token/Validate",
  },
  categoriesEndpoint: "Categories",
  recordsEndpoint: "Records",
};
