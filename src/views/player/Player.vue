<script setup lang='ts'>
import { ref, computed } from 'vue';
import PlayerVillages from '@/components/player/PlayerVillages.vue';

const props = defineProps<{
    world: string
    id: string
}>();

const player = ref<PlayerInfo | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/player/${props.id}`);
    player.value = await response.json() as PlayerInfo | null;
})();

// Nome do jogador.
const playerName = computed(() => {
    return player.value?.player_name ? player.value.player_name : 'Jogador não encontrado';
});

// Outros itens.
const parseNumber = (value: number | undefined) => value ? value.toLocaleString('pt-br') : '0';
const playerPoints = computed(() => parseNumber(player.value?.points));
const villageAmount = computed(() => parseNumber(player.value?.village_amount));
const meanPoints = computed(() => parseNumber(player.value?.mean_points));
const playerRank = computed(() => parseNumber(player.value?.rank));

// Imagem de perfil.
const profileImage = ref<string | null>(null);
(async () => {
    const response = await fetch(`/api/game/${props.world}/player/${props.id}/profile`);
    if (response.status === 404) return;
    const page = await response.text();

    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(page, 'text/html').documentElement;
    // Exemplo: https://dsbr.innogamescdn.com/asset/49b70961/graphic/userimage/359921_large
    const imageSrc = htmlDocument.querySelector('img[src*="userimage" i]')?.getAttribute('src');

    // Caso não encontre uma imagem, usa um avatar aleatório.
    if (!imageSrc) {
        const avatarId = Math.floor(Math.random() * (25 - 1) + 1);
        profileImage.value = `https://dsbr.innogamescdn.com/asset/49b70961/graphic/avatar/${avatarId.toString(10)}.jpg`;
    } else {
        profileImage.value = imageSrc;
    };
})();

const playerVillages = ref<VillageInfo[] | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/player/${props.id}/villages`);
    if (response.status === 404) return;
    const villages = await response.json() as VillageInfo[] | null;
    if (Array.isArray(villages) && villages.length > 0) {
        playerVillages.value = villages;
    };
})();

const playerLink = { name: 'player', params: { world: props.world, id: props.id } };
</script>

<template>
    <div class="player-view">
        <div class="user-profile-container">
            <div class="user-image-area">
                <img v-if="profileImage" :src="profileImage" class="profile-image">
            </div>
            <div>
                <table>
                    <tr>
                        <th scope="row" colspan="2" class="double-table-header">
                            <router-link :to="playerLink">{{ playerName }}</router-link>
                        </th>
                    </tr>
                    <tr>
                        <th scope="row">Tribo</th>
                        <td>
                            <template v-if="player?.ally_name">
                                <router-link :to="{ name: 'ally', params: { world: props.world, id: player.ally_id } }">
                                    {{ player.ally_name }}
                                </router-link>
                                {{ ` — ${player.ally_tag}` }}
                            </template>
                            <template v-else>—</template>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Pontos</th>
                        <td>{{ playerPoints }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Aldeias</th>
                        <td>{{ villageAmount }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Média por aldeia</th>
                        <td>{{ meanPoints }}</td>
                    </tr>
                    <tr>
                        <th scope="row">Ranking</th>
                        <td>{{ playerRank }}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div v-if="playerVillages" class="villages-container">
            <PlayerVillages :villages="playerVillages"/>
        </div>
    </div>
</template>

<style scoped>
.player-view {
    overflow: hidden;
}

.user-profile-container {
    position: absolute;
    top: 0;
    display: flex;
    margin-top: 0.5em;
    width: 100%;
    border-bottom: 1px solid var(--main-border-color);
}

.villages-container {
    position: absolute;
    top: 200px;
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: scroll;
    overflow-x: hidden;
}

.user-profile-container th {
    text-align: left;
    padding-right: 2em;
}

.user-image-area {
    width: 270px;
    height: 180px;
    margin-right: 1em;
    margin-bottom: 0.5em;
}

.profile-image {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.double-table-header {
    text-align: center !important;
    padding-right: 0 !important;
    padding-bottom: 0.5em !important;
    font-size: larger;
}
</style>