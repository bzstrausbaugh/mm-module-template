import { createStore } from 'zustand/vanilla';

// Create the store instance
export const eventStore = createStore((set) => ({
  events: [],
}));
