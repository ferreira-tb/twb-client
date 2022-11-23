<script setup lang='ts'>
import { inject } from 'vue';
import { world as worldKey, type WorldKey } from '@/keys.js';

const { world } = inject(worldKey) as WorldKey;
</script>

<template>
<nav>
    <div>
        <router-link :to="{ name: 'home' }" class="home-page-link">
            Insidious – Mundo {{ world }}
        </router-link>
    </div>
    <div class="nav-bar-menu">
        <div>
            <router-link :to="{ name: 'player_ranking', params: { world: world } }">
                Jogadores
            </router-link>
        </div>
        <div>
            <router-link :to="{ name: 'ally_ranking', params: { world: world } }">
                Tribos
            </router-link>
        </div>
        <div>
            <router-link :to="{ name: 'conquests', params: { world: world } }">
                Conquistas
            </router-link>
        </div>
    </div>
</nav>
</template>

<style scoped>
div.nav-bar-menu {
    margin-right: 20px;
    display: flex;
}

div.nav-bar-menu div {
    align-self: center;
    margin-left: 10px;
}

a.home-page-link {
    font-size: larger;
    font-weight: bolder;
}
</style>