<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form @submit.prevent="submitForm">
        <!-- Email field -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Password field -->
        <div class="mb-6 relative">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute right-3 top-1/2 mt-2.5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Error Messages -->
        <div v-if="errors.length" class="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          <ul class="list-disc list-inside">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          :disabled="loading"
        >
          <span v-if="!loading">Login</span>
          <span v-else>Processing...</span>
        </button>

        <p class="mt-4 text-center text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">Register here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(() => {
      document.title = "Login";
      if (authStore.token) {
        router.push({ name: "Home Page", replace: true });
      }
    });

    const email = ref<string>("");
    const password = ref<string>("");
    const showPassword = ref<boolean>(false);
    const errors = ref<string[]>([]);
    const loading = ref<boolean>(false);

    function togglePasswordVisibility(): void {
      showPassword.value = !showPassword.value;
    }

    // Validate fields on the client side
    function errorExist(): boolean {
      errors.value = [];

      if (!email.value.trim()) {
        errors.value.push("The email field is required.");
      }
      if (!password.value) {
        errors.value.push("The password field is required.");
      }

      return errors.value.length > 0;
    }

    async function submitForm(): Promise<void> {
      if (errorExist()) return;
      loading.value = true;

      // Prepare the payload for Djoser JWT endpoint
      const formData = {
        email: email.value,
        password: password.value,
      };

      try {
        // Call Djoser JWT create endpoint
        const response = await axios.post("/api/v1/jwt/create/", formData);

        // Store the token in auth store
        const token = response.data.access;
        authStore.login(token);
        authStore.setEmail(email.value);

        // Redirect to home page
        await router.push({name: "Home Page"});
      } catch (error: any) {
        console.error("Login error:", error.response?.data);
        const errorData = error.response?.data || {};
        errors.value = [];

        if (typeof errorData === 'object') {
          for (const key in errorData) {
            if (Array.isArray(errorData[key])) {
              errors.value.push(...errorData[key]);
            } else if (typeof errorData[key] === 'string') {
              errors.value.push(errorData[key]);
            }
          }
        }

        // Handle non-field errors or default message
        if (errorData.detail) {
          errors.value.push(errorData.detail);
        }

        if (errors.value.length === 0) {
          errors.value.push("Invalid email or password");
        }
      } finally {
        loading.value = false;
      }
    }

    return {
      email,
      password,
      showPassword,
      errors,
      loading,
      togglePasswordVisibility,
      submitForm,
    };
  },
});
</script>

<style scoped>
/* Add your custom styles here */
</style>