import { createWebHistory, createRouter } from "vue-router";
import Home from './views/Home.vue';
import LastConquests from "./views/LastConquests.vue";

const routes = [
    {
        path: '/',
        name: 'Início',
        component: Home
    },
    {
        path: '/conquests',
        name: 'Conquistas',
        component: LastConquests
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});