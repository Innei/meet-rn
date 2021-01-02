import { makeAutoObservable } from 'mobx';
import { SentenceModel } from '../models';
import { getToken } from '../utils/auth';
import { $http } from '../utils/request';

export class SyncStore {
  constructor() {
    makeAutoObservable(this);

    this.fetch();
  }

  list: SentenceModel[] = [];

  fetch = async () => {
    const { data: list } = (await $http.get('/sentences/user')) as {
      data: SentenceModel[];
    };
    this.list = list;
  };

  delete = async (id: string) => {
    await $http.delete('/sentences/' + id);
    this.list.filter((i) => i.id !== id || i.nonce !== id);
  };

  sync = async (
    list: Pick<SentenceModel, 'author' | 'from' | 'type' | 'nonce' | 'text'>[],
  ) => {
    const { data: newList } = await $http.post('/sentences/sync', list);
    console.log(newList);

    this.list = newList;
  };
}

export const syncStore = new SyncStore();
