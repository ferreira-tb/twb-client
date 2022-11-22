import type { InjectionKey, Ref } from 'vue';

export const worldKey = Symbol() as InjectionKey<Readonly<Ref<string>>>;