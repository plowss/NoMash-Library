import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// PrimeVue imports
import PrimeVue from 'primevue/config';



// Create Vue app
const vueApp = createApp(App);
vueApp.use(PrimeVue);
vueApp.use(router);
vueApp.mount('#app');
