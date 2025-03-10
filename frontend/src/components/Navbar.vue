<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-bold">
        <router-link to="/">MyApp</router-link>
      </div>
      <div>
        <template v-if="authStore.isAuthenticated">
          <button
            @click="logout"
            class="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-700"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700"
          >
            Login
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
</style>