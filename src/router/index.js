import { createRouter, createWebHistory } from 'vue-router';

import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,  
    meta: { requiresAuth: false },  
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
    meta: { requiresAuth: false },  
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,  
    meta: { requiresAuth: true },  
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login', 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; 
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/FireLogin');  
  } else if ((to.path === '/register' || to.path === '/FireLogin') && isAuthenticated) {
    next('/');  
  } else {
    next();  
  }
});

export default router;
