import { createStore } from './store';

export const toast = createStore({ message: '', id: 0 });

export function showToast(message: string) {
  toast.set({ message, id: toast.get().id + 1 });
}
