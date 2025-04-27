const { axiosClient } = require("../axios");

export const authApi = {
  getCsrfToken: async () => {
    return await axiosClient.get("/sanctum/csrf-cookie");
  },
  login: async (data) => {
    return await axiosClient.post("/login", data);
  },
  getUser: async () => {
    return await axiosClient.get("/api/user");
  },
  logout: async () => {
    return await axiosClient.post("/logout");
  },
};
