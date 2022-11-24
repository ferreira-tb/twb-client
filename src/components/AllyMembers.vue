<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/common/keys.js';
import { inject } from 'vue';

const props = defineProps<{
    members: PlayerInfo[]
}>();

const { world } = inject(worldKey) as WorldKey;
let rank = 1;
</script>

<template>
    <table class="ally-members">
        <thead class="sticky-table-header">
            <tr>
                <th>Rank</th>
                <th>Nome</th>
                <th>Pontos</th>
                <th>Rank global</th>
                <th>Aldeias</th>
                <th>Média por aldeia</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="member of props.members">
                <tr>
                    <td> {{ rank++ }} </td>
                    <td>
                        <router-link :to="{ name: 'player', params: { world: world, id: member.player_id } }">
                            {{ member.player_name }}
                        </router-link>
                    </td>
                    <td> {{ member.points.toLocaleString('pt-br') }} </td>
                    <td> {{ member.rank.toLocaleString('pt-br') }} </td>
                    <td> {{ member.village_amount.toLocaleString('pt-br') }} </td>
                    <td> {{ member.mean_points.toLocaleString('pt-br') }} </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<style scoped>
.ally-members {
    width: 100%;
    text-align: center;
    margin-top: 0.3em;
    margin-bottom: 2em;
}
</style>