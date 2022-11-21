<script setup lang='ts'>
import type { ConquestRecord } from 'index';
import { ref } from 'vue';

let lastConquests = ref<ConquestRecord[] | null>(null);

async function getConquests() {
    const response = await fetch('/api/interface/get_conquer');
    const conquests = await response.json() as ConquestRecord[] | undefined;

    if (Array.isArray(conquests) && conquests.length > 0) {
        conquests.sort((a, b) => b.raw.time - a.raw.time);
        return conquests as ConquestRecord[];
    };

    return null;
};

(async () => {
    lastConquests.value = await getConquests();
    // setInterval(async () => lastConquests.value = await getConquests(), 60000 * 10);
})();

</script>

<template>
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
                    <td> {{ conquest.time }}</td>
                    <td> {{ conquest.village }} </td>
                    <td> {{ conquest.village_points }} </td>
                    <td>
                        {{ conquest.old_owner }}
                        {{ conquest.old_tribe ? ` (${conquest.old_tribe})` : '' }}
                    </td>
                    <td>
                        {{ conquest.new_owner }}
                        {{ conquest.new_tribe ? ` (${conquest.new_tribe})` : '' }}
                    </td>
                </tr>
            </template>
        </table>
        <p v-else>Nenhuma conquista registrada.</p>
    </div>
</template>

<style scoped>
div {
    margin-top: 5px;
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