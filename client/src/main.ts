import { createApp } from 'vue';

import '@/assets/styles/style.scss';
import router from '@/router';
import setAxios from '@/lib/api';
import registerGlobalComponents from '@/plugins/global_components';
import registerGlobalDirectives from '@/plugins/global_directives';

import App from '@/App.vue';

const app = createApp(App);

setAxios();
registerGlobalComponents(app);
registerGlobalDirectives(app);

app.use(router);
app.mount('body');
