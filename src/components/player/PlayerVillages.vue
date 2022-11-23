<script setup lang='ts'>
const props = defineProps<{
    villages: VillageInfo[]
}>();
</script>

<template>
    <table class="player-villages">
        <tr>
            <th>Aldeia</th>
            <th>Pontos</th>
            <th>Coordenadas</th>
            <th>Continente</th>
        </tr>
        <template v-for="village of props.villages">
            <tr>
                <td> {{ village.name }}</td>
                <td> {{ village.points.toLocaleString('pt-br') }} </td>
                <td> {{ village.coords }} </td>
                <td> {{ village.continent }} </td>
            </tr>
        </template>
    </table>
</template>

<style scoped>
table.player-villages {
    width: 100%;
    text-align: center;
}
</style>