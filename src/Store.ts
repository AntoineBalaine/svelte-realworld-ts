import { writable, type Writable } from "svelte/store";
import type { PageData } from "./routes/$types";

export let data: PageData;
export type Store = Writable<PageData>;

export const store: Store = writable();
