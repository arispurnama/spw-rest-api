import axiosInstance from "./axiosInstance";

const authService = axiosInstance.create({});
const baseURL = "/login";

export default {
  login(payload, headers) {
    return authService.post(`${baseURL}`, payload, headers);
  },

  register(payload, headers) {
    return authService.post(/api/register, payload, headers);
  },
};