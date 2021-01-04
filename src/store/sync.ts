import {
  makeAutoObservable,
  makeObservable,
  observable,
  action,
  computed,
} from 'mobx';
import { SentenceModel } from '../models';
import { getToken } from '../utils/auth';
import { $http } from '../utils/request';

export class SyncStore {
  constructor() {
    makeObservable(this, {
      list: observable,
      fetch: action,
      delete: action,
      sync: action,
      addSyncTask: action,
      syncTime: observable,
    });

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

  syncTime: Date | null = null;

  sync = async (
    list: Pick<SentenceModel, 'author' | 'from' | 'type' | 'nonce' | 'text'>[],
  ) => {
    // console.log(list);

    const { data: newList } = await $http.post('/sentences/sync', list);
    // console.log(newList);
    this.syncTime = new Date();
    this.list = newList;
  };

  private timer: any;
  addSyncTask = async (fn: () => void, gap: number) => {
    this.cleanTimer();
    this.timer = setInterval(() => {
      if (getToken()) {
        fn();
      }
    }, gap);
  };

  private cleanTimer = () => {
    if (this.timer) {
      this.timer = clearInterval(this.timer);
    }
  };
}

export const syncStore = new SyncStore();
