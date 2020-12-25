import { createContext, useContext } from 'react';
import { FavoriteStore } from './favorite';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});
export interface Stores {
  favoriteStore: FavoriteStore;
}

export default function createMobxStores(): Stores {
  return {
    favoriteStore: new FavoriteStore(),
  };
}

export const StoreContext = createContext<Stores>(createMobxStores());
export const StoreProvider = StoreContext.Provider;
export const useStore = (): Stores => useContext(StoreContext);
