<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
      <form @submit.prevent="submitForm">
        <!-- Name field (used as "name" on the backend) -->
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            v-model="name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
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
        <div class="mb-4 relative">
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
            class="absolute inset-y-0 right-0 px-4 py-2 text-gray-600"
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
        <!-- Confirm Password field for client-side validation only -->
        <div class="mb-6 relative">
          <label class="block text-gray-700 mb-2">Confirm Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <!-- Error Messages -->
        <div v-if="errors.length" class="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          <ul class="list-disc list-inside">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>

        <!-- Success Message -->
        <div v-if="showSuccess" class="mb-4 p-4 bg-green-50 text-green-600 rounded-lg">
          Registration successful! Redirecting to login...
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          :disabled="loading"
        >
          <span v-if="!loading">Register</span>
          <span v-else>Processing...</span>
        </button>

        <p class="mt-4 text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Login here</router-link>
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
        router.push({ name: "home", replace: true });
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
