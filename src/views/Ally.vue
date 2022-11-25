<script setup lang='ts'>
import { computed, ref } from 'vue';
import AllyMembers from '@/components/AllyMembers.vue';

const props = defineProps<{
    world: string
    id: string
}>();

const ally = ref<AllyInfo | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/ally/${props.id}`);
    if (response.status === 404) return;
    ally.value = await response.json() as AllyInfo | null;
})();

// Nome e sigla da tribo.
const allyName = computed(() => ally.value?.name ? ally.value.name : 'Tribo não encontrada');
const allyTag = computed(() => ally.value?.tag ? ally.value.tag : '—');
// Outros itens.
const parseNumber = (value: number | undefined) => value ? value.toLocaleString('pt-br') : '0';
const allyRank = computed(() => parseNumber(ally.value?.rank));
const allyPoints = computed(() => parseNumber(ally.value?.points));
const allyTotalPoints = computed(() => parseNumber(ally.value?.all_points));
const memberAmount = computed(() => parseNumber(ally.value?.member_amount));
const pointsPerMember = computed(() => parseNumber(ally.value?.points_per_member));
const villageAmount = computed(() => parseNumber(ally.value?.village_amount));
const pointsPerVillage = computed(() => parseNumber(ally.value?.points_per_village));

// Brasão da tribo.
const allyImage = ref<string | null>(null);
(async () => {
    const response = await fetch(`/api/game/${props.world}/ally/${props.id}/profile`);
    if (response.status === 404) return;
    const page = await response.text();

    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(page, 'text/html').documentElement;
    // Exemplo: https://dsbr.innogamescdn.com/asset/49b70961/graphic/userimage/360469_large
    const selector = 'img[src*="userimage" i]:not(.userimage-tiny)';
    const imageSrc = htmlDocument.querySelector(selector)?.getAttribute('src');

    // Caso não encontre uma imagem, usa um avatar aleatório.
    if (!imageSrc) {
        const avatarId = Math.floor(Math.random() * (25 - 1) + 1);
        allyImage.value = `https://dsbr.innogamescdn.com/asset/49b70961/graphic/avatar/${avatarId.toString(10)}.jpg`;
    } else {
        allyImage.value = imageSrc;
    };
})();

const allyMembers = ref<PlayerInfo[] | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/ally/${props.id}/members`);
    if (response.status === 404) return;
    const members = await response.json() as PlayerInfo[] | null;
    if (Array.isArray(members) && members.length > 0) {
        allyMembers.value = members;
    };
})();

const allyLink = { name: 'ally', params: { world: props.world, id: props.id } };
</script>

<template>
    <div class="ally-view">
        <div class="ally-profile-container">
            <div class="ally-image-area">
                <img v-if="allyImage" :src="allyImage" class="profile-image">
            </div>
            <div>
                <table>
                    <tr>
                        <th scope="row" colspan="4" class="colspan-table-header">
                            <router-link :to="allyLink">{{ allyName }}</router-link>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row">Sigla</th>
                        <td>{{ allyTag }}</td>

                        <th scope="row" class="second-row-header">Membros</th>
                        <td>{{ memberAmount }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Ranking</th>
                        <td>{{ allyRank }}</td>

                        <th scope="row" class="second-row-header">Média por membro</th>
                        <td>{{ pointsPerMember }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Pontos (40 melhores)</th>
                        <td>{{ allyPoints }}</td>

                        <th scope="row" class="second-row-header">Aldeias</th>
                        <td>{{ villageAmount }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Pontuação total</th>
                        <td>{{ allyTotalPoints }}</td>

                        <th scope="row" class="second-row-header">Média por aldeia</th>
                        <td>{{ pointsPerVillage }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-if="allyMembers" class="members-container">
            <AllyMembers :members="allyMembers"/>
        </div>
    </div>
</template>

<style scoped>
.ally-view {
    overflow: hidden;
}
.ally-profile-container {
    position: absolute;
    top: 0;
    display: flex;
    margin-top: 0.5em;
    width: 100%;
    border-bottom: 1px solid var(--main-border-color);
}

.members-container {
    position: absolute;
    top: 220px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
}

.ally-profile-container tr {
    line-height: 1.3em;
}

.ally-profile-container th {
    text-align: left;
    padding-right: 2em;
}

.second-row-header {
    padding-left: 1em;
}

.ally-image-area {
    width: 300px;
    height: 200px;
    margin-right: 1em;
    margin-bottom: 0.5em;
}

.profile-image {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>