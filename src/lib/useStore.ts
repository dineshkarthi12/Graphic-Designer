import { useSyncExternalStore } from 'react';
import type { createStore } from './store';

export function useStore<T extends object>(store: ReturnType<typeof createStore<T>>) {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}
