<script setup lang='ts'>
import { ref } from 'vue';
const world = ref('116');

</script>

<template>
<div class="nav-bar">
    <div>
        <router-link :to="{ name: 'Início' }" class="home-page-link">
            Tribal Wars Brasil – Mundo {{ world }}
        </router-link>
    </div>
    <div class="nav-bar-menu">
        <div>Jogadores</div>
        <div>Tribos</div>
        <div>
            <router-link :to="{ name: 'Conquistas' }">
                Conquistas
            </router-link>
        </div>
    </div>
</div>
</template>

<style scoped>
div.nav-bar {
    display: flex;
    justify-content: space-between;
    position: sticky;
    height: 30px;

    border-bottom: 1px solid #363636;
}

div.nav-bar-menu {
    margin-right: 20px;
    display: flex;
}

div.nav-bar-menu div {
    margin-left: 10px;
}

a.home-page-link {
    font-size: larger;
    font-weight: bolder;
}
</style>