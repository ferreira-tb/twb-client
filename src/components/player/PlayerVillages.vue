<script setup lang='ts'>
const props = defineProps<{
    villages: VillageInfo[]
}>();
</script>

<template>
    <table class="player-villages">
        <thead class="sticky-table-header">
            <tr>
                <th>Aldeia</th>
                <th>Pontos</th>
                <th>Coordenadas</th>
                <th>Continente</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="village of props.villages">
                <tr>
                    <td> {{ village.name }}</td>
                    <td> {{ village.points.toLocaleString('pt-br') }} </td>
                    <td> {{ village.coords }} </td>
                    <td> {{ village.continent }} </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<style scoped>
.player-villages {
    width: 100%;
    text-align: center;
    margin-bottom: 2em;
}
</style>