<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-bold">
        <router-link to="/">django-todolist</router-link>
      </div>
      <div>
        <template v-if="authStore.isAuthenticated">
          <button
            @click="logout"
            class="text-white p-2 rounded bg-red-500 hover:bg-red-700 flex items-center justify-center"
            aria-label="Logout"
            title="Logout"
          >
            <LogOut />
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-white p-2 rounded bg-blue-500 hover:bg-blue-700 flex items-center justify-center"
            aria-label="Login"
            title="Login"
          >
            <User />
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { LogOut, User } from 'lucide-vue-next';
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