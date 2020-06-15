import { writable } from "svelte/store";

export const token = writable(localStorage.getItem("token"));

export const books = writable([]);
export const booksFiltered = writable([]);
export const bookTitle = writable("");
export const results = writable([]);
