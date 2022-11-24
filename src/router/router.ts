import { createWebHistory, createRouter, type RouteRecordRaw } from "vue-router";
import Home from '@/views/Home.vue';
import Ally from '@/views/Ally.vue';
import AllyRanking from '@/views/AllyRanking.vue';
import PlayerRanking from '@/views/PlayerRanking.vue';
import Player from '@/views/Player.vue';
import Village from '@/views/Village.vue';
import Conquests from '@/views/Conquests.vue';

const world = ':world';
const id = ':id(\\d+)';

const routes: RouteRecordRaw[] = [
    // Página inicial.
    {
        path: '/',
        name: 'home',
        component: Home
    },
    // Ranking de jogadores.
    {
        path: `/${world}/player`,
        name: 'player_ranking',
        component: PlayerRanking
    },
    // Página do jogador.
    {
        path: `/${world}/player/${id}`,
        name: 'player',
        component: Player,
        props: true
    },
    // Ranking de tribos.
    {
        path: `/${world}/ally`,
        name: 'ally_ranking',
        component: AllyRanking
    },
    // Página da tribo.
    {
        path: `/${world}/ally/${id}`,
        name: 'ally',
        component: Ally,
        props: true
    },
    // Página da aldeia.
    {
        path: `/${world}/village/${id}`,
        name: 'village',
        component: Village,
        props: true
    },
    // Últimas conquistas.
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