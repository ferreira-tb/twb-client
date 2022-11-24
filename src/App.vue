<script setup lang='ts'>
import NavBar from '@/components/NavBar.vue';

</script>

<template>
    <NavBar class="nav-bar"/>
    <main><router-view class="main-view"/></main>
</template>

<style scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid var(--main-border-color);
}

main {
    position: fixed;
    top: 30px;
    bottom: 0;
    width: 100%;
}

.main-view {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>