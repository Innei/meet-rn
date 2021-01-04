import { makeAutoObservable } from 'mobx';
import { FavoriteModel, SentenceType, Snowflake } from '../models';
import { $http } from '../utils/request';
import FlakeId from '../utils/snowflake';
import { FavoriteStorage } from '../utils/storage';

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

  addMore = async (
    list: (Omit<FavoriteModel, 'id' | 'type'> &
      Partial<Pick<FavoriteModel, 'id'>>)[],
  ) => {
    for await (const item of list) {
      await this.add(item);
    }
  };
  add = async (
    model: Omit<FavoriteModel, 'id' | 'type'> &
      Partial<Pick<FavoriteModel, 'id'>>,
  ) => {
    if (!model.id) {
      model.id = new FlakeId().gen();
      // @ts-ignore
      model.type = SentenceType.USER;
    } else {
      if (
        this.map.has(model.id) ||
        (model.likeId && this.map.has(model.likeId)) ||
        // @ts-ignore
        this.map.has(model.nonce)
      ) {
        return;
      }

      //@ts-ignore
      model.type = SentenceType.SYSTEM;
      model.likeId = model.id;
    }
    // @ts-ignore
    const newModel = await FavoriteStorage.add(model);
    this.list = this.list.concat(newModel);
    try {
      await $http.post('/sentences', model);
    } catch (e) {}
    return this.list;
  };

  deleteById = async (id: Snowflake) => {
    await FavoriteStorage.delete(id);
    this.list = this.list.filter((m) => m.id !== id);
    return this.list;
  };
}
