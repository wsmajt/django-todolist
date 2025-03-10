<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-2xl font-bold">
        <router-link to="/">MyApp</router-link>
      </div>
      <div>
        <router-link to="/login" class="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-700">
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>

</script>

<style scoped>
</style>