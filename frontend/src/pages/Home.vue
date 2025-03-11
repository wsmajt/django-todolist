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

const toggleCompletion = async (id: number, completed: boolean) => {
  await postStore.toggleCompletion(id, !completed);
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <div class="max-w-4xl mx-auto p-6">
      <h1 class="text-4xl font-bold text-center mb-10 text-indigo-400 py-6">Todo List</h1>

      <div v-if="authStore.isAuthenticated" class="mt-10">
        <!-- Add Post Form -->
        <div class="mb-8">
          <form @submit.prevent="addPost" class="flex space-x-3">
            <input
              v-model="newPost"
              type="text"
              placeholder="What needs to be done?"
              class="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-100 placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
            >
              Add
            </button>
          </form>
        </div>

        <!-- Posts List -->
        <div v-if="postStore.isLoading" class="text-center py-6">
          <p class="text-gray-400">Loading tasks...</p>
        </div>
        <div v-else-if="postStore.error" class="text-center text-red-400 py-6">
          {{ postStore.error }}
        </div>
        <div v-else>
          <!-- Incomplete Tasks Section -->
          <h2 class="text-xl font-semibold mb-4 text-indigo-300 border-b border-gray-700 pb-2">
            Active Tasks
          </h2>
          <transition-group
            name="task-list"
            tag="ul"
            class="space-y-2 mb-8"
          >
            <li
              v-for="post in postStore.incompletePosts"
              :key="post.id"
              class="p-4 flex justify-between items-center bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-all"
            >
              <span class="text-gray-200">{{ post.content }}</span>
              <div class="flex items-center space-x-2">
                <button
                  @click="toggleCompletion(post.id, post.completed || false)"
                  class="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Mark as completed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button
                  @click="removePost(post.id)"
                  class="bg-gray-700 hover:bg-red-600 text-gray-200 p-2 rounded-lg transition-colors duration-200"
                  title="Delete task"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </li>
            <li v-if="postStore.incompletePosts.length === 0" class="py-4 text-center text-gray-400">
              No active tasks. Everything is completed!
            </li>
          </transition-group>

          <!-- Completed Tasks Section -->
          <div v-if="postStore.completedPosts.length > 0">
            <h2 class="text-xl font-semibold mb-4 text-indigo-300 border-b border-gray-700 pb-2">
              Completed Tasks
            </h2>
            <transition-group
              name="task-list"
              tag="ul"
              class="space-y-2"
            >
              <li
                v-for="post in postStore.completedPosts"
                :key="post.id"
                class="p-4 flex justify-between items-center bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-650 transition-all"
              >
                <span class="text-gray-300 line-through">{{ post.content }}</span>
                <div class="flex items-center space-x-2">
                  <button
                    @click="toggleCompletion(post.id, post.completed || false)"
                    class="bg-gray-600 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-200"
                    title="Mark as active"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    @click="removePost(post.id)"
                    class="bg-gray-600 hover:bg-red-600 text-gray-200 p-2 rounded-lg transition-colors duration-200"
                    title="Delete task"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            </transition-group>
          </div>

          <!-- No tasks message -->
          <div v-if="postStore.posts.length === 0" class="py-8 text-center text-gray-400">
            No tasks yet. Add one above!
          </div>
        </div>
      </div>

      <!-- Not authenticated message -->
      <div v-else class="mt-10 text-center bg-gray-800 p-8 rounded-lg border border-gray-700">
        <p class="text-lg mb-6 text-gray-300">Please log in to manage your todo list</p>
        <div class="flex justify-center gap-4">
          <router-link to="/login" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
            Login
          </router-link>
          <router-link to="/register" class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200">
            Register
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-list-enter-active,
.task-list-leave-active {
  transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.task-list-move {
  transition: transform 0.5s ease;
}
</style>