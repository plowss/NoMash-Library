import { createRouter, createWebHistory } from 'vue-router';

import AddBookName from '@/views/AddBookName.vue';
import AddBookView from '@/views/AddBookView.vue';
import CountBookAPI from '@/views/CountBookAPI.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import GetAllBookAPI from '@/views/GetAllBookAPI.vue';
import GetBookCountView from '@/views/GetBookCountView.vue';
import HomeView from '@/views/HomeView.vue';
import WeatherView from '@/views/WeatherView.vue';

const routes = [
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,  
    meta: { requiresAuth: false },  
  },
  {
    path: '/addbook',
    name: 'Addbook',
    component: AddBookView
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
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBookName
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/FireLogin'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed as normal
  }
});


export default router;
