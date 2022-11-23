<script setup lang='ts'>
import { worldKey } from '@/keys';
import { inject, type Ref } from 'vue';

const props = defineProps<{
    players: PlayerInfo[]
}>();

const world = inject(worldKey) as Readonly<Ref<string>>;
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
        <td> {{ player.points }} </td>
        <td> {{ player.village_amount }} </td>
        <td> {{ player.mean_points }} </td>
    </tr>
</template>