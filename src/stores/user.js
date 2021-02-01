import { writable } from "svelte/store";

export const user = writable(null);
export const collections = writable([{ id: 1, name: "Uncategorized" }]);
