import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router";
import Home from '@/views/Home.vue';
import AllyRanking from '@/views/ally/AllyRanking.vue';
import PlayerRanking from '@/views/player/PlayerRanking.vue';
import Player from '@/views/player/Player.vue';
import Conquests from '@/views/conquer/Conquests.vue';

const world = ':world';
const id = ':id(\\d+)';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: `/${world}/player`,
        name: 'player_ranking',
        component: PlayerRanking
    },
    {
        path: `/${world}/player/${id}`,
        name: 'player',
        component: Player,
        props: true
    },
    {
        path: `/${world}/ally`,
        name: 'ally_ranking',
        component: AllyRanking
    },
    {
        path: `/${world}/conquests`,
        name: 'conquests',
        component: Conquests
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});