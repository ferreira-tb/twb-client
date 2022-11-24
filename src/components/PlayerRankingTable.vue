<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/common/keys.js';
import { inject } from 'vue';

const props = defineProps<{
    players: PlayerInfo[]
}>();

const { world } = inject(worldKey) as WorldKey;
</script>

<template>
    <tr v-for="player of props.players">
        <td> {{ player.rank }}</td>
        <td>
            <router-link :to="{ name: 'player', params: { world: world, id: player.player_id } }">
                {{ player.player_name }}
            </router-link>
        </td>
        <td>
            <template v-if="player.ally_name">
                <router-link :to="{ name: 'ally', params: { world: world, id: player.ally_id } }">
                    {{ player.ally_name }}
                </router-link>
            </template>
            <template v-else>—</template> 
        </td>
        <td> {{ player.points.toLocaleString('pt-br') }} </td>
        <td> {{ player.village_amount.toLocaleString('pt-br') }} </td>
        <td> {{ player.mean_points.toLocaleString('pt-br') }} </td>
    </tr>
</template>