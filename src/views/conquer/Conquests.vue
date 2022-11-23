<script setup lang='ts'>
import { world as worldKey, type WorldKey } from '@/keys';
import { inject, ref } from 'vue';
import ConquestsTable from '@/components/conquer/ConquestsTable.vue';

const { world } = inject(worldKey) as WorldKey;

const lastConquests = ref<ConquerInfo[] | null>(null);
const isLoading = ref<boolean>(true);
(async () => {
    const response = await fetch(`/api/interface/${world.value}/get_conquer`);
    const conquests = await response.json() as ConquerInfo[] | null;

    lastConquests.value = conquests;
    isLoading.value = false;
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
</style>