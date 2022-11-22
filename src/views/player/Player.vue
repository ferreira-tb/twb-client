<script setup lang='ts'>
import { ref, computed } from 'vue';

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

// Nome da tribo.
const noAlly = ref<boolean>(true);
const allyName = computed(() => {
    const fullName = player.value?.ally_name;
    if (!fullName) return 'Nenhuma';
    noAlly.value = false;

    const allyTag = player.value?.ally_tag;
    if (allyTag) return `${fullName} (${allyTag})`;

    return fullName;
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
        const avatarId = Math.floor(Math.random() * (26 - 1) + 1);
        profileImage.value = `https://dsbr.innogamescdn.com/asset/49b70961/graphic/avatar/${avatarId.toString(10)}.jpg`;
    };
})();

const playerVillages = ref<ExtendedVillage[] | null>(null);
(async () => {
    const response = await fetch(`/api/query/${props.world}/player/${props.id}/villages`);
    if (response.status === 404) return;
    const villages = await response.json() as ExtendedVillage[] | null;
    if (Array.isArray(villages) && villages.length > 0) {
        playerVillages.value = villages;
    };
})();
</script>

<template>
    <div class="user-profile">
        <div class="user-image-area">
            <img v-if="profileImage" :src="profileImage" class="profile-image">
        </div>
        <div>
            <table>
                <tr>
                    <th scope="row" colspan="2" class="table-header">
                        <router-link :to="{ name: 'player', params: { world: props.world, id: props.id } }">
                            {{ playerName }}
                        </router-link>
                    </th>
                </tr>
                <tr>
                    <th scope="row">Tribo</th>
                    <td :class="{ 'no-ally': noAlly }">{{ allyName }}</td>
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
    <div class="player-villages">
        <table v-if="playerVillages">
            <tr>
                <th>Aldeia</th>
                <th>Pontos</th>
                <th>Coordenadas</th>
                <th>Continente</th>
            </tr>
            <template v-for="village of playerVillages">
                <tr>
                    <td> {{ village.name }}</td>
                    <td> {{ village.points.toLocaleString('pt-br') }} </td>
                    <td> {{ village.coords }} </td>
                    <td> {{ village.continent }} </td>
                </tr>
            </template>
        </table>
    </div>
</template>

<style scoped>
div.user-profile {
    display: flex;
    margin-top: 10px;
}

div.user-profile th {
    text-align: left;
    padding-right: 20px;
}

div.user-image-area {
    width: 270px;
    height: 180px;
    margin-right: 15px;
}

div.player-villages table {
    width: 100%;
    text-align: center;
}

img.profile-image {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

td.no-ally {
    font-style: italic;
}
</style>