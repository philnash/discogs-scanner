import { writable } from "svelte/store";

export const localStore = (key, initial) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, initial);
  }

  const saved = localStorage.getItem(key);
  const { subscribe, set, update } = writable(saved);

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, value);
      return set(value);
    },
    update,
  };
};
