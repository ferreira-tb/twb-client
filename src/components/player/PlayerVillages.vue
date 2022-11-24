<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/keys';
import { inject } from 'vue';

const props = defineProps<{
    villages: VillageInfo[]
}>();

const { world } = inject(worldKey) as WorldKey;
</script>

<template>
    <table class="player-villages">
        <thead class="sticky-table-header">
            <tr>
                <th>Aldeia</th>
                <th>Pontos</th>
                <th>Coordenadas</th>
                <th>Continente</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="village of props.villages">
                <tr>
                    <td>
                        <router-link :to="{ name: 'village', params: { world: world, id: village.village_id } }">
                            {{ village.name }}
                        </router-link>
                    </td>
                    <td> {{ village.points.toLocaleString('pt-br') }} </td>
                    <td> {{ village.coords }} </td>
                    <td> {{ village.continent }} </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<style scoped>
.player-villages {
    width: 100%;
    text-align: center;
    margin-top: 0.3em;
    margin-bottom: 2em;
}
</style>