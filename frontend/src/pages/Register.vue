<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-900">
    <div class="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-8 text-center text-indigo-400">Register</h2>
      <form @submit.prevent="submitForm">
        <!-- Name field -->
        <div class="mb-6">
          <label class="block text-gray-300 mb-2 font-medium">Name</label>
          <input
            type="text"
            v-model="name"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-200 placeholder-gray-500 transition-all"
            required
          />
        </div>

        <!-- Email field -->
        <div class="mb-6">
          <label class="block text-gray-300 mb-2 font-medium">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-200 placeholder-gray-500 transition-all"
            required
          />
        </div>

        <!-- Password field -->
        <div class="mb-6">
          <label class="block text-gray-300 mb-2 font-medium">Password</label>
          <div class="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-200">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="flex-grow px-4 py-3 bg-gray-800 border-0 text-gray-200 placeholder-gray-500 focus:outline-none"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="px-4 text-gray-400 hover:text-indigo-400 transition-colors focus:outline-none"
              aria-label="Toggle password visibility"
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
        </div>

        <!-- Confirm Password field -->
        <div class="mb-6">
          <label class="block text-gray-300 mb-2 font-medium">Confirm Password</label>
          <div class="flex bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 transition-all duration-200">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="flex-grow px-4 py-3 bg-gray-800 border-0 text-gray-200 placeholder-gray-500 focus:outline-none"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="px-4 text-gray-400 hover:text-indigo-400 transition-colors focus:outline-none"
              aria-label="Toggle password visibility"
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
        </div>

        <!-- Error Messages -->
        <div v-if="errors.length" class="mb-6 p-4 bg-red-900/30 text-red-400 rounded-lg border border-red-800/50">
          <ul class="list-disc list-inside">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mb-6 p-4 bg-green-900/30 text-green-400 rounded-lg border border-green-800/50">
          Registration successful! Redirecting to login...
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          :disabled="loading"
        >
          <span v-if="!loading">Register</span>
          <span v-else>Processing...</span>
        </button>

        <p class="mt-6 text-center text-gray-400">
          Already have an account?
          <router-link to="/login" class="text-indigo-400 hover:text-indigo-300 transition-colors">Login here</router-link>
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
  name: "Register",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    onMounted(() => {
      document.title = "Sign Up";
      if (authStore.token) {
        router.push({ name: "Home Page", replace: true });
      }
    });

    // Use "name" instead of "username" since your serializer expects "name"
    const name = ref<string>("");
    const email = ref<string>("");
    const password = ref<string>("");
    const confirmPassword = ref<string>("");
    const showPassword = ref<boolean>(false);
    const errors = ref<string[]>([]);
    const showSuccess = ref<boolean>(false);
    const loading = ref<boolean>(false);

    function togglePasswordVisibility(): void {
      showPassword.value = !showPassword.value;
    }

    // Validate fields on the client side
    function errorExist(): boolean {
      errors.value = [];

      if (!name.value.trim()) {
        errors.value.push("The name field is required.");
      }
      if (!email.value.trim()) {
        errors.value.push("The email field is required.");
      }
      if (!password.value) {
        errors.value.push("The password field is required.");
      }
      if (!confirmPassword.value) {
        errors.value.push("The confirm password field is required.");
      }
      if (password.value !== confirmPassword.value) {
        errors.value.push("The two password fields didn't match.");
      }

      return errors.value.length > 0;
    }

    async function submitForm(): Promise<void> {
      if (errorExist()) return;
      loading.value = true;

      // Prepare the payload according to your serializer
      const formData = {
        name: name.value,
        email: email.value,
        password: password.value,
        re_password: confirmPassword.value,
      };

      // Clear any existing Authorization header
      axios.defaults.headers.common["Authorization"] = "";

      try {
        // Use the endpoint that corresponds to your serializer configuration
        await axios.post("/api/v1/users/", formData);
        errors.value = [];
        showSuccess.value = true;
        setTimeout(() => {
          router.push({ name: "Login Page" });
        }, 2000);
      } catch (error: any) {
        console.error("Registration error:", error.response.data);
        const errorData = error.response.data;
        errors.value = [];
        for (const key in errorData) {
          errors.value.push(...errorData[key]);
        }
      } finally {
        loading.value = false;
      }
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      showPassword,
      errors,
      showSuccess,
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
