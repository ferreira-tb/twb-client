import { createApp, ref, readonly, reactive } from 'vue';
import { router } from '@/router/router.js';
import * as key from '@/common/keys.js';
import App from '@/App.vue';

const app = createApp(App);

// Mundo atual.
const world = ref<string>('116');
const switchWorld = (otherWorld: string) => world.value = otherWorld;
app.provide(key.world, { world: readonly(world), switchWorld });

// Todos os mundos.
const allWorlds = reactive<string[]>([]);
app.provide(key.allWorlds, readonly(allWorlds));

// Status HTTP.
const badStatus = reactive(new Set([204, 404]));
app.provide(key.badStatus, readonly(badStatus));

(async () => {
    const response = await fetch('/api/worlds');
    const worlds = await response.json();

    if (Array.isArray(worlds)) {
        allWorlds.push(...worlds.filter((item) => typeof item === 'string'));
    };
})();

app.use(router);
app.mount('#app');