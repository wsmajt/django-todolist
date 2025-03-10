import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import {useAuthStore} from "./stores/auth"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home Page',
    meta: { requiresAuth: false },
    component: Home,
  },
  {
    path: '/login',
    name: 'Login Page',
    meta: { requiresAuth: false },
    component: Login,
  },
  {
    path: '/register',
    name: 'Register Page',
    meta: { requiresAuth: false },
    component: Register,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});


export default router