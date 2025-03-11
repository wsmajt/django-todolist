import { defineStore } from "pinia";
import axios from "axios";

interface Post {
  id: number;
  content: string;
  completed?: boolean;
  created_at?: string;
}

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [] as Post[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    completedPosts: (state) => state.posts.filter(post => post.completed),
    incompletePosts: (state) => state.posts.filter(post => !post.completed),
  },

  actions: {
    async fetchPosts() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.get('/api/v1/posts/');
        this.posts = response.data;
      } catch (error) {
        this.error = "Failed to fetch todos";
        console.error("Error fetching posts:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async toggleCompletion(id: number, completed: boolean) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.patch(`/api/v1/posts/${id}/`, { completed });
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          this.posts[index] = response.data;
        }
      } catch (error) {
        this.error = "Failed to update todo status";
        console.error("Error updating post completion:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async addPost(content: string) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post('/api/v1/posts/', { content });
        this.posts.push(response.data);
      } catch (error) {
        this.error = "Failed to add todo";
        console.error("Error adding post:", error);
      } finally {
        this.isLoading = false;
      }
    },


    async removePost(id: number) {
      this.isLoading = true;
      this.error = null;

      try {
        await axios.delete(`/api/v1/posts/${id}/`);
        this.posts = this.posts.filter(post => post.id !== id);
      } catch (error) {
        this.error = "Failed to delete todo";
        console.error("Error deleting post:", error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});