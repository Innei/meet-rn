import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '../models';

const tokenKey = '@meet/token';
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(tokenKey);
  } catch {
    return null;
  }
};

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(tokenKey, token);
  } catch {}
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(tokenKey);
  } catch {}
};
const userKey = '@meet/user';
export const getUser = async () => {
  try {
    // @ts-ignore
    return JSON.parse(await AsyncStorage.getItem(userKey));
  } catch {
    return null;
  }
};

export const setUser = async (user: UserModel) => {
  try {
    await AsyncStorage.setItem(userKey, JSON.stringify(user));
  } catch {}
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(userKey);
  } catch {}
};
