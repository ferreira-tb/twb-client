<script setup lang='ts'>
import { worldKey } from '@/keys';
import { inject, ref, type Ref } from 'vue';
import ConquestsTable from '@/components/ConquestsTable.vue';

const world = inject(worldKey) as Readonly<Ref<string>>;

const lastConquests = ref<ConquestRecord[] | null>(null);
async function getConquests() {
    const response = await fetch(`/api/interface/${world.value}/get_conquer`);
    const conquests = await response.json() as ConquestRecord[] | null;

    if (Array.isArray(conquests) && conquests.length > 0) {
        conquests.sort((a, b) => b.raw.time - a.raw.time);
        return conquests as ConquestRecord[];
    };

    return null;
};

const isLoading = ref<boolean>(true);
(async () => {
    lastConquests.value = await getConquests();
    isLoading.value = false;
    setInterval(async () => lastConquests.value = await getConquests(), 60000 * 10);
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
            <ConquestsTable :conquests="lastConquests"/>
        </table>
        <p class="italic" v-else-if="isLoading">Carregando...</p>
        <p class="italic" v-else>Nenhuma conquista registrada.</p>
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

p.italic {
    font-style: italic;
}
</style>