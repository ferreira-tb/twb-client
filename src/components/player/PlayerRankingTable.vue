<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/keys';
import { inject } from 'vue';

const props = defineProps<{
    players: PlayerInfo[]
}>();

const { world } = inject(worldKey) as WorldKey;
const params = (value: number) => {
    return { name: 'player', params: { world: world.value, id: String(value) } };
};
</script>

<template>
    <tr v-for="player of props.players">
        <td> {{ player.rank }}</td>
        <router-link :to="params(player.player_id)">
            {{ player.player_name }}
        </router-link>
        <td> {{ player.ally_name }} </td>
        <td> {{ player.points.toLocaleString('pt-br') }} </td>
        <td> {{ player.village_amount.toLocaleString('pt-br') }} </td>
        <td> {{ player.mean_points.toLocaleString('pt-br') }} </td>
    </tr>
</template>