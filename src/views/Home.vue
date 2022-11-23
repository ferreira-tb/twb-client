<script setup lang='ts'>
import { inject } from 'vue';
import * as key from '@/keys';
import { parseWorld } from '@/modules/world';

const allWorlds = inject(key.allWorlds, []);
const { switchWorld } = inject(key.world) as key.WorldKey;
</script>

<template>
    <h1 class="home-title">Escolha um mundo</h1>
    <div class="button-area">
        <button v-for="world of allWorlds" @click.prevent="switchWorld(world)" class="world-button">
            {{ parseWorld(world) }}
        </button>
    </div>
</template>

<style scoped>
.home-title {
    text-align: center;
}

.button-area {
    text-align: center;
}

.world-button {
    margin-left: 5px;
    margin-right: 5px;
}
</style>