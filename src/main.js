import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue imports
import PrimeVue from 'primevue/config';

// Firebase imports
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyCBOzN_uSvo6S5Gg54wzagsu3D5xej05rQ",
  authDomain: "week7-yalin.firebaseapp.com",
  projectId: "week7-yalin",
  storageBucket: "week7-yalin.appspot.com",
  messagingSenderId: "293371232535",
  appId: "1:293371232535:web:9206b69b2c3537dda4b752",
  measurementId: "G-50BD99LF7D"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Create Vue app
const vueApp = createApp(App);
vueApp.use(PrimeVue);
vueApp.use(router);
vueApp.mount('#app');
