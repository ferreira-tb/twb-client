<script setup lang='ts'>
import { inject } from 'vue';
import * as key from '@/common/keys';
import { useWorldName } from '@/common/functions.js';
import StandardButton from '@/components/StandardButton.vue';

const allWorlds = inject(key.allWorlds, []);
const { switchWorld } = inject(key.world) as key.WorldKey;
</script>

<template>
    <h1 class="home-title" v-if="allWorlds.length > 0">Escolha um mundo</h1>
    <h1 class="home-title" v-else>Nenhum mundo disponível</h1>
    <div class="button-area">
        <template v-for="world of allWorlds">
            <StandardButton :text="useWorldName(world)" @click.prevent="switchWorld(world)"/>
        </template>
    </div>
</template>

<style scoped>
.home-title {
    text-align: center;
}

.button-area {
    text-align: center;
}
</style>