<script setup lang='ts'>
import { computed, inject, ref } from 'vue';
import { badStatus as badStatusKey } from '@/common/keys.js';
import ConquestsTable from '@/components/ConquestsTable.vue';

const props = defineProps<{
    world: string
    id: string
}>();

const badStatus = inject(badStatusKey) as Readonly<Set<number>>;
const village = ref<ExtendedVillageInfo | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/village/${props.id}`);
    if (badStatus.has(response.status)) return;
    village.value = await response.json() as ExtendedVillageInfo;
})();

// Informações sobre a aldeia.
const villageName = computed(() => village.value?.name ? village.value.name : 'Aldeia não encontrada');
const coords = computed(() => village.value?.coords ? village.value.coords : '000|000');
const continent = computed(() => village.value?.continent ? village.value.continent : 'K00');
const playerName = computed(() => village.value?.player_name ? village.value?.player_name : '—');
const allyName = computed(() => village.value?.ally_name ? village.value?.ally_name : '—');

// Pontos da aldeia.
const parseNumber = (value: number | undefined) => value ? value.toLocaleString('pt-br') : '0';
const villagePoints = computed(() => parseNumber(village.value?.points));

const isLoading = ref<boolean>(true);
const villageConquests = ref<ConquerInfo[] | null>(null);
(async () => {
    try {
        const response = await fetch(`/api/query/${props.world}/village/${props.id}/conquests`);
        if (badStatus.has(response.status)) return;

        const rawConquests = await response.json() as (ConquerInfo | null)[];
        if (Array.isArray(rawConquests) && rawConquests.length > 0) {
            const conquests = rawConquests.filter((conquer) => conquer) as ConquerInfo[];
            villageConquests.value = conquests;
        };

    } catch (err) {
        if (err instanceof Error) throw err;

    } finally {
        isLoading.value = false;
    };
})();

const allyLink = computed(() => {
    const allyID = ref(village.value?.ally_id);
    return { name: 'ally', params: { world: props.world, id: allyID.value } };
});
const playerLink = computed(() => {
    const playerID = ref(village.value?.player_id);
    return { name: 'player', params: { world: props.world, id: playerID.value } };
});
const villageLink = { name: 'village', params: { world: props.world, id: props.id } };
</script>

<template>
    <div class="village-view">
        <div class="village-profile-container">
            <table>
                <tr>
                    <th scope="row" colspan="2" class="colspan-table-header">
                        <router-link :to="villageLink">{{ villageName }}</router-link>
                    </th>
                </tr>
                <tr>
                    <th scope="row">Coordenadas</th>
                    <td>{{ coords }}</td>
                </tr>
                <tr>
                    <th scope="row">Continente</th>
                    <td>{{ continent }}</td>
                </tr>
                <tr>
                    <th scope="row">Pontos</th>
                    <td>{{ villagePoints }}</td>
                </tr>
                
                <tr>
                    <th scope="row">Jogador</th>
                    <td>
                        <router-link v-if="village && village.player_id !== 0" :to="playerLink">
                            {{ playerName }}
                        </router-link>
                        <template v-else>{{ playerName }}</template>
                    </td>
                </tr>

                <tr v-if="village?.player_name">
                    <th scope="row">Tribo</th>
                    <td>
                        <router-link v-if="village.ally_id" :to="allyLink">
                            {{ allyName }}
                        </router-link>
                        <template v-else>{{ allyName }}</template>
                    </td>
                </tr>
            </table>
        </div>
        <div class="conquests-container">
            <template v-if="villageConquests && villageConquests.length > 0">
                <ConquestsTable :conquests="villageConquests" :hide-village="true"/>
            </template>
            <p class="italic" v-else-if="isLoading">Carregando...</p>
            <p class="italic" v-else>Nenhuma conquista registrada.</p>  
        </div>
    </div>
</template>

<style scoped>
.village-view {
    overflow: hidden;
}

.village-profile-container {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    margin-top: 0.5em;
    width: 100%;
    border-bottom: 1px solid var(--main-border-color);
}

.conquests-container {
    position: absolute;
    top: 200px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    text-align: center;
}

.village-profile-container table {
    margin-bottom: 1em;
}

.village-profile-container th {
    text-align: left;
    padding-right: 2em;
}
</style>