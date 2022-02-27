import { writable } from 'svelte/store';

export const taskGroupSearchString = writable<string>(null);
export const taskSearchString = writable<string>(null);
