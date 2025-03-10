<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { usePostStore } from '../stores/post';

const router = useRouter();
const authStore = useAuthStore();
const postStore = usePostStore();
const newPost = ref('');

onMounted(() => {
  if (authStore.isAuthenticated) {
    postStore.fetchPosts();
  }
});

const addPost = async () => {
  if (newPost.value.trim()) {
    await postStore.addPost(newPost.value);
    newPost.value = '';
  }
};

const removePost = async (id: number) => {
  await postStore.removePost(id);
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-8">Todo List</h1>

    <div v-if="authStore.isAuthenticated" class="mt-8">
      <!-- Add Post Form -->
      <div class="mb-8">
        <form @submit.prevent="addPost" class="flex space-x-2">
          <input
            v-model="newPost"
            type="text"
            placeholder="What needs to be done?"
            class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </form>
      </div>

      <!-- Posts List -->
      <div v-if="postStore.isLoading" class="text-center">
        <p>Loading posts...</p>
      </div>
      <div v-else-if="postStore.error" class="text-center text-red-500">
        {{ postStore.error }}
      </div>
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="post in postStore.posts" :key="post.id" class="py-4 flex justify-between items-center">
          <span>{{ post.content }}</span>
          <button
            @click="removePost(post.id)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Delete
          </button>
        </li>
        <li v-if="postStore.posts.length === 0" class="py-4 text-center text-gray-500">
          No todos yet. Add one above!
        </li>
      </ul>
    </div>

    <!-- Not authenticated message -->
    <div v-else class="mt-8 text-center">
      <p class="text-lg mb-4">Please log in to manage your todo list</p>
      <div class="flex justify-center gap-4">
        <router-link to="/login" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
          Login
        </router-link>
        <router-link to="/register" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
          Register
        </router-link>
      </div>
    </div>
  </div>
</template>