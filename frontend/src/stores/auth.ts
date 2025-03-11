import { defineStore } from "pinia";
import axios from "axios";

interface AuthState {
  token: string;
  email: string;
  selectedNavbarItem: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    // Get token from localStorage
    const token = localStorage.getItem("token") || "";

    // Set axios default header if token exists
    if (token) {
      axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
    }

    return {
      token,
      email: localStorage.getItem("email") || "",
      selectedNavbarItem: localStorage.getItem("selectedNavbarItem") || "",
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    login(token: string) {
      this.token = token;
      axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
      localStorage.setItem("token", token);
    },

    logout() {
      this.token = "";
      this.email = "";
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },

    setEmail(email: string) {
      this.email = email;
      localStorage.setItem("email", email);
    },
  },
});