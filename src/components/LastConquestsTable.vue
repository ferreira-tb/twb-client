<script setup lang='ts'>
import { ref } from 'vue';

let lastConquests = ref<Conquer[] | null>(null);

async function getLastConquests() {
    const response = await fetch('/api/interface/get_conquer');
    const conquests = await response.json() as Conquer[] | undefined;

    if (Array.isArray(conquests) && conquests.length > 0) {
        while (conquests.length > 5) conquests.pop();
        conquests.sort((a, b) => b.time - a.time);
        return conquests as Conquer[];
    };

    return null;
};

</script>

<template>
    <div>
        <button @click="async () => lastConquests = await getLastConquests()">Atualizar</button>
    </div>
    <div>
        <table v-if="lastConquests">
            <tr>
                <th>Hora</th>
                <th>Aldeia</th>
                <th>Pontos</th>
                <th>Proprietário anterior</th>
                <th>Novo proprietário</th>
            </tr>
            <template v-for="conquest of lastConquests">
                <tr>
                    <td> {{ new Date(conquest.time).toLocaleTimeString('pt-br') }}</td>
                    <td> {{ conquest.village_id }} </td>
                    <td> {{ conquest.points }} </td>
                    <td> {{ conquest.old_owner }} </td>
                    <td> {{ conquest.new_owner }} </td>
                </tr>
            </template>
        </table>
        <p v-else>Nenhuma conquista registrada.</p>
    </div>
    
</template>

<style>
div {
    text-align: center;
}

table {
    width: 100%;
}

th {
    font-weight: bold;
}

p {
    font-style: italic;
}
</style>