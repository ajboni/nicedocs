import { writable, derived, get } from "svelte/store";
import config from "./config.yaml";
export let docs = writable([]);
export let currentLanguage = writable({})
export function getLanguage(id) {
	const language = config.availableLanguages.find(lang => lang.id === id)
		? config.availableLanguages.find(lang => lang.id === id)
		: config.availableLanguages.find(lang => lang.id === config.defaultLanguage)
	return language;
}