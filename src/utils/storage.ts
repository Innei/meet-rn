import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteModel, Snowflake } from '../models';
import FlakeId from './snowflake';

class Storage {
  constructor(private readonly key: string) {}

  getList = async (): Promise<FavoriteModel[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(this.key);
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      return [];
    }
  };

  add = async (
    model: Omit<FavoriteModel, 'id'> & Partial<Pick<FavoriteModel, 'id'>>,
  ) => {
    const { id = new FlakeId().gen() as string } = model;
    const prev = await this.getList();
    const map = new Map(
      prev.map((m) => {
        return [m.id, m];
      }),
    );
    if (map.has(id)) {
      return prev;
    }
    const newModel = { ...model, id };
    const newList = prev.concat(newModel);
    await AsyncStorage.setItem(this.key, JSON.stringify(newList));
    return newModel;
  };

  delete = async (id: Snowflake) => {
    if (!id) {
      return;
    }
    const prev = await this.getList();
    const after = prev.filter((m) => m.id !== id);

    await AsyncStorage.setItem(this.key, JSON.stringify(after));
  };
}

class FavoriteStorageStatic extends Storage {
  public static key = '@meet/favorite';
  constructor() {
    super(FavoriteStorageStatic.key);
  }
}

class PendingStorageStatic extends Storage {
  public static key = '@meet/pending';
  constructor() {
    super(PendingStorageStatic.key);
  }
}

export const FavoriteStorage = new FavoriteStorageStatic();
export const PendingStorage = new PendingStorageStatic();
