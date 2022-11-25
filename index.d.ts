interface Conquer {
    readonly village_id: number;
    readonly time: number;
    readonly new_owner_id: number;
    readonly old_owner_id: number;
    readonly old_tribe_id: number;
    readonly new_tribe_id: number;
    readonly points: number;
}

// Após o filtro presente no construtor da classe,
// apenas "old_tribe" e "new_tribe" podem ser "null".
interface ConquerInfo {
    readonly time: string;
    readonly village: string;
    readonly village_points: string;
    readonly new_owner: string;
    readonly old_owner: string;
    readonly new_tribe: string | null;
    readonly old_tribe: string | null;
    readonly raw: Conquer;
}

interface AllyInfo {
    readonly ally_id: number;
    readonly name: string;
    readonly tag: string;
    readonly member_amount: number;
    readonly village_amount: number;
    readonly points: number;
    readonly all_points: number;
    readonly rank: number;
    readonly points_per_member: number;
    readonly points_per_village: number;
}

interface PlayerInfo {
    readonly player_id: number;
    readonly player_name: string;
    readonly ally_id: number | null;
    readonly ally_name: string | null;
    readonly ally_tag: string | null;
    readonly village_amount: number;
    readonly points: number;
    readonly mean_points: number;
    readonly rank: number;
}

interface VillageInfo {
    readonly village_id: number;
    readonly name: string;
    readonly x: number;
    readonly y: number;
    readonly coords: string;
    readonly continent: string;
    readonly player_id: number;
    readonly player_name: string | null;
    readonly points: number;
    readonly type: number;
}

interface ExtendedVillageInfo extends VillageInfo {
    readonly ally_id: number | null;
    readonly ally_name: string | null;
}