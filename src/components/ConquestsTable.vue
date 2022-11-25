<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/common/keys.js';
import { inject } from 'vue';

const props = defineProps<{
    conquests: ConquerInfo[]
    hideVillage?: boolean
}>();

const { world } = inject(worldKey) as WorldKey;
const params = (value: number) => {
    return { name: 'player', params: { world: world.value, id: String(value) } };
};
</script>

<template>
    <table class="conquests-table">
        <thead class="sticky-table-header">
            <tr>
                <th>Hora</th>
                <th v-if="props.hideVillage !== true">Aldeia</th>
                <th>Pontos</th>
                <th>Proprietário anterior</th>
                <th>Novo proprietário</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="conquest of props.conquests">
                <td> {{ conquest.time }}</td>

                <td v-if="props.hideVillage !== true">
                    <router-link :to="{ name: 'village', params: { world: world, id: conquest.raw.village_id } }">
                        {{ conquest.village }}
                    </router-link>
                </td>

                <td> {{ conquest.village_points }} </td>

                <td>
                    <router-link v-if="conquest.raw.old_owner_id !== 0" :to="params(conquest.raw.old_owner_id)">
                        {{ conquest.old_owner }}
                    </router-link>
                    
                    <span v-else class="italic">{{ conquest.old_owner }}</span>
                    {{ conquest.old_tribe ? ` (${conquest.old_tribe})` : '' }}
                </td>

                <td>
                    <router-link :to="params(conquest.raw.new_owner_id)">
                        {{ conquest.new_owner }}
                    </router-link>
                    {{ conquest.new_tribe ? ` (${conquest.new_tribe})` : '' }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.conquests-table {
    width: 100%;
    text-align: center;
    margin-top: 0.3em;
    margin-bottom: 2em;
}
</style>