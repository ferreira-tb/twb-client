import { createApp, ref, readonly } from 'vue';
import { router } from './router/router.js';
import { worldKey } from './keys.js';
import App from './App.vue';

const app = createApp(App);

const world = ref<string>('116');
app.provide(worldKey, readonly(world));

app.use(router);
app.mount('#app');