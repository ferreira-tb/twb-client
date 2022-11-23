<script setup lang='ts'>
const props = defineProps<{
    allies: AllyInfo[]
}>();
</script>

<template>
    <tr v-for="ally of props.allies">
        <td> {{ ally.rank.toLocaleString('pt-br') }}</td>
        <td> {{ ally.name }}</td>
        <td> {{ ally.points.toLocaleString('pt-br') }}</td>
        <td> {{ ally.all_points.toLocaleString('pt-br') }}</td>
        <td> {{ ally.member_amount }}</td>
        <td> {{ ally.points_per_member.toLocaleString('pt-br') }}</td>
        <td> {{ ally.village_amount.toLocaleString('pt-br') }}</td>
        <td> {{ ally.points_per_village.toLocaleString('pt-br') }}</td>
    </tr>
</template>