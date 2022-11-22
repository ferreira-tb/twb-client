<script setup lang='ts'>
import { worldKey } from '@/keys';
import { inject, type Ref } from 'vue';

const props = defineProps<{
    conquests: ConquestRecord[]
}>();

const world = inject(worldKey) as Readonly<Ref<string>>;
const params = (value: number) => {
    return { name: 'player', params: { world: world.value, id: String(value) } };
};
</script>

<template>
    <tr v-for="conquest of props.conquests">
        <td> {{ conquest.time }}</td>
        <td> {{ conquest.village }} </td>
        <td> {{ conquest.village_points }} </td>
        <td>
            <router-link v-if="conquest.raw.old_owner_id !== 0" :to="params(conquest.raw.old_owner_id)">
                {{ conquest.old_owner }}
            </router-link>
            
            <span v-else>{{ conquest.old_owner }}</span>
            {{ conquest.old_tribe ? ` (${conquest.old_tribe})` : '' }}
        </td>
        <td>
            <router-link :to="params(conquest.raw.new_owner_id)">
                {{ conquest.new_owner }}
            </router-link>
            {{ conquest.new_tribe ? ` (${conquest.new_tribe})` : '' }}
        </td>
    </tr>
</template>