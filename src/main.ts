import { createApp, ref, readonly, reactive } from 'vue';
import { router } from '@/router/router.js';
import * as key from '@/common/keys.js';
import App from '@/App.vue';

const app = createApp(App);

const world = ref<string>('116');
const switchWorld = (otherWorld: string) => world.value = otherWorld;
app.provide(key.world, { world: readonly(world), switchWorld });

const allWorlds = reactive<string[]>([]);
app.provide(key.allWorlds, readonly(allWorlds));

(async () => {
    const response = await fetch('/api/worlds');
    const worlds = await response.json();

    if (Array.isArray(worlds)) {
        allWorlds.push(...worlds.filter((item) => typeof item === 'string'));
    };
})();

app.use(router);
app.mount('#app');