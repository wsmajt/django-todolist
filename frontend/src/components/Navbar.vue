<template>
  <nav class="bg-gray-950 border-b border-gray-800 shadow-sm">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-1">
        <router-link
          to="/"
          class="text-xl font-medium bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity duration-200"
        >
          django-todolist
        </router-link>
      </div>

      <div>
        <template v-if="authStore.isAuthenticated">
          <button
            @click="logout"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 hover:bg-red-900 text-gray-200 hover:text-gray-100 transition-all duration-300 flex items-center space-x-2 border border-gray-700 hover:border-red-800"
            aria-label="Logout"
          >
            <LogOut class="w-4 h-4" />
            <span>Logout</span>
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-300 flex items-center space-x-2 shadow-sm"
            aria-label="Login"
          >
            <User class="w-4 h-4" />
            <span>Login</span>
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