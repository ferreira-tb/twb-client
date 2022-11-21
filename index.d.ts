import type { VueElement } from "vue";

interface Conquer {
    readonly village_id: number;
    readonly time: number;
    readonly new_owner: number;
    readonly old_owner: number;
    readonly old_tribe_id: number;
    readonly new_tribe_id: number;
    readonly points: number;
}

// Após oo filtro presente no construtor da classe,
// apenas "old_tribe" e "new_tribe" podem ser "null".
interface ConquestRecord {
    readonly time: string;
    readonly village: string;
    readonly village_points: string;
    readonly new_owner: string;
    readonly old_owner: string;
    readonly old_tribe: string | null;
    readonly new_tribe: string | null;
    readonly raw: Conquer;
}