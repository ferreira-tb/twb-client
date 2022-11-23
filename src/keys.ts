import type { InjectionKey, Ref } from 'vue';

export interface WorldKey {
    world: Readonly<Ref<string>>;
    switchWorld: (otherWorld: string) => string;
}

export const world = Symbol() as InjectionKey<WorldKey>;
export const allWorlds = Symbol() as InjectionKey<Readonly<string[]>>;