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
    const origin = [...this.list];
    this.list = this.list.filter((i) => i.id !== id);

    try {
      await $http.delete('/sentences/' + id);
    } catch {
      this.list = origin;
    }
    // console.log(id, this.list);
  };

  sync = async (
    list: Pick<SentenceModel, 'author' | 'from' | 'type' | 'nonce' | 'text'>[],
  ) => {
    // console.log(list);

    const { data: newList } = await $http.post('/sentences/sync', list);
    // console.log(newList);

    this.list = newList;
  };
}

export const syncStore = new SyncStore();
