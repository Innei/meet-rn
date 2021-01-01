import { makeAutoObservable, toJS } from 'mobx';
import { FavoriteModel, Snowflake } from '../models';
import FlakeId from '../utils/snowflake';
import { FavoriteStorage, PendingStorage } from '../utils/storage';

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
    const list = await FavoriteStorage.getList();
    this.list = list;
    return this.list;
  };

  add = async (
    model: Omit<FavoriteModel, 'id'> & Partial<Pick<FavoriteModel, 'id'>>,
  ) => {
    if (!model.id) {
      model.id = new FlakeId().gen();
    }
    const newModel = await FavoriteStorage.add(model);
    this.list = this.list.concat(newModel);
    return this.list;
  };

  deleteById = async (id: Snowflake) => {
    await FavoriteStorage.delete(id);
    this.list = this.list.filter((m) => m.id !== id);
    return this.list;
  };
}
