<script setup lang='ts'>
const props = defineProps<{
    allies: AllyInfo[]
}>();
</script>

<template>
    <tr v-for="ally of props.allies">
        <td> {{ ally.rank }}</td>
        <td> {{ ally.name }}</td>
        <td> {{ ally.points }}</td>
        <td> {{ ally.all_points }}</td>
        <td> {{ ally.member_amount }}</td>
        <td> {{ ally.points_per_member }}</td>
        <td> {{ ally.village_amount }}</td>
        <td> {{ ally.points_per_village }}</td>
    </tr>
</template>