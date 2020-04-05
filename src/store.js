import { writable, derived, get } from "svelte/store";
export let docs = writable([]);
export let currentLanguage = writable('eng')