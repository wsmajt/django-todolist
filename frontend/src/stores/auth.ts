import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    email: localStorage.getItem("email") || "",
    selectedNavbarItem: localStorage.getItem("selectedNavbarItem") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    // Call the djoser JWT endpoint (/api/v1/jwt/create/) in your login form,
    // then use this action to store the token.
    login(token: string) {
      this.token = token;
      // djoser typically expects the JWT token to be prefixed with "JWT "
      axios.defaults.headers.common.Authorization = 'JWT ' + token
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = "";
      this.email = "";
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
    setEmail(email: string) {
      this.email = email;
      localStorage.setItem("email", email);
    },
    setSelectedNavbarItem(item: string) {
      this.selectedNavbarItem = item;
      localStorage.setItem("selectedNavbarItem", item);
    },
  },
});
