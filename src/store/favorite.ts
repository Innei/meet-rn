import { makeAutoObservable } from 'mobx';
import { FavoriteModel, Snowflake } from '../models';
import FlakeId from '../utils/snowflake';
import {
  addFavoriteToExistListFromStorage,
  deleteFavoriteToExistListFromStorage,
  getFavoriteListFromStorage,
} from '../utils/storage';

export class FavoriteStore {
  constructor() {
    makeAutoObservable(this);
    this.loadList();
  }

  list: FavoriteModel[] = [];

  get map() {
    return new Map(this.list.map((m) => [m.id, m]));
  }

  loadList = async () => {
    const list = await getFavoriteListFromStorage();
    this.list = list;
    return this.list;
  };

  add = async (
    model: Omit<FavoriteModel, 'id'> & Partial<Pick<FavoriteModel, 'id'>>,
  ) => {
    if (!model.id) {
      model.id = new FlakeId().gen();
    }
    this.list = await addFavoriteToExistListFromStorage(model);
    return this.list;
  };

  deleteById = async (id: Snowflake) => {
    await deleteFavoriteToExistListFromStorage(id);
    this.list = this.list.filter((m) => m.id !== id);
    return this.list;
  };
}
