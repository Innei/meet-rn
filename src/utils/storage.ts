import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteModel, Snowflake } from '../models';
import FlakeId from './snowflake';

const FAVORITE_KEY = '@meet/favorite';
export const getFavoriteListFromStorage = async (): Promise<
  FavoriteModel[]
> => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY);
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    return [];
  }
};

export const addFavoriteToExistListFromStorage = async (
  model: Omit<FavoriteModel, 'id'> & Partial<Pick<FavoriteModel, 'id'>>,
) => {
  const { id = new FlakeId().gen() as string } = model;
  const prev = await getFavoriteListFromStorage();
  const map = new Map(
    prev.map((m) => {
      return [m.id, m];
    }),
  );
  if (map.has(id)) {
    return prev;
  }
  const newList = prev.concat({ ...model, id });
  await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(newList));
  return newList;
};

export const deleteFavoriteToExistListFromStorage = async (id: Snowflake) => {
  if (!id) {
    return;
  }
  const prev = await getFavoriteListFromStorage();
  const index = prev.findIndex((m) => m.id === id);
  const after = prev.splice(index, 1);
  await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(after));
  return prev[index];
};
