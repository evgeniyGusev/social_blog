import { createApp } from 'vue';

import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/aura-light-green/theme.css';

import '@/assets/styles/style.scss';
import router from '@/router';
import setAxios from '@/lib/api';

import App from '@/App.vue';

const app = createApp(App);

setAxios();

app.use(router);
app.use(PrimeVue);
app.mount('body');
