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

interface ConquestRecord {
    readonly time: number;
    readonly village: string;
    readonly village_points: number;
    readonly new_owner: string;
    readonly old_owner: string;
}