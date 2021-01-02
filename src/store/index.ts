import { createContext, useContext } from 'react';
import { FavoriteStore } from './favorite';
import { configure } from 'mobx';
import { UserStore, UserStoreStatic } from './user';
import { syncStore, SyncStore } from './sync';

configure({
  enforceActions: 'never',
});
export interface Stores {
  favoriteStore: FavoriteStore;
  userStore: UserStoreStatic;
  syncStore: SyncStore;
}

export default function createMobxStores(): Stores {
  return {
    favoriteStore: new FavoriteStore(),
    userStore: UserStore,
    syncStore,
  };
}
export const Store = createMobxStores();
export const StoreContext = createContext<Stores>(Store);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): Stores => useContext(StoreContext);

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  global.store = Store;
}
