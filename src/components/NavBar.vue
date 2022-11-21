<script setup lang='ts'>
import { ref } from 'vue';
const world = ref('116');

</script>

<template>
<nav>
    <div>
        <router-link :to="{ name: 'Início' }" class="home-page-link">
            Tribal Wars Brasil – Mundo {{ world }}
        </router-link>
    </div>
    <div class="nav-bar-menu">
        <div>
            <router-link :to="{ name: 'Jogadores' }">
                Jogadores
            </router-link>
        </div>
        <div>
            <router-link :to="{ name: 'Tribos' }">
                Tribos
            </router-link>
        </div>
        <div>
            <router-link :to="{ name: 'Conquistas' }">
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