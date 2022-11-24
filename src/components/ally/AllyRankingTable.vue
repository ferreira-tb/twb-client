<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/keys';
import { inject } from 'vue';

const props = defineProps<{
    allies: AllyInfo[]
}>();

const { world } = inject(worldKey) as WorldKey;
</script>

<template>
    <tr v-for="ally of props.allies">
        <td> {{ ally.rank.toLocaleString('pt-br') }}</td>
        <td>
            <router-link :to="{ name: 'ally', params: { world: world, id: ally.ally_id } }">
                {{ ally.name }}
            </router-link>
        </td>
        <td> {{ ally.points.toLocaleString('pt-br') }}</td>
        <td> {{ ally.all_points.toLocaleString('pt-br') }}</td>
        <td> {{ ally.member_amount }}</td>
        <td> {{ ally.points_per_member.toLocaleString('pt-br') }}</td>
        <td> {{ ally.village_amount.toLocaleString('pt-br') }}</td>
        <td> {{ ally.points_per_village.toLocaleString('pt-br') }}</td>
    </tr>
</template>