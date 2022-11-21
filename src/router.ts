import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home.vue';
import AllyRanking from '@/views/ally/AllyRanking.vue';
import PlayerRanking from '@/views/player/PlayerRanking.vue';
import Player from '@/views/player/Player.vue';
import Conquests from '@/views/conquer/Conquests.vue';

const routes = [
    {
        path: '/',
        name: 'Início',
        component: Home
    },
    {
        path: '/player',
        name: 'Jogadores',
        component: PlayerRanking
    },
    {
        path: '/player/:id',
        name: 'Jogador',
        component: Player
    },
    {
        path: '/ally',
        name: 'Tribos',
        component: AllyRanking
    },
    {
        path: '/conquests',
        name: 'Conquistas',
        component: Conquests
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});