import { makeAutoObservable } from 'mobx';
import { UserModel } from '../models';
import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from '../utils/auth';
import { $http } from '../utils/request';

export class UserStoreStatic {
  constructor() {
    makeAutoObservable(this);

    getToken().then((token) => {
      if (token) {
        this.token = token;
      }
    });

    getUser().then((user) => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
        this.user = user;
      }
    });
  }

  username = '';
  email = '';
  token = '';

  user: UserModel = {} as any;
  login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const user = (await $http.post('/auth/login', {
        username,
        password,
      })) as any;
      this.token = user.token;
      this.username = username;
      this.email = user.email;
      this.user = user;
      setToken(user.token);
      setUser(user);
    } catch (e) {
      console.log(e.message);
      if (e.response && [422, 401].includes(e.response.status)) {
        this.logout();
      }
      throw e;
    }
  };
  logout = () => {
    removeToken();
    removeUser();
    ['username', 'email', 'token'].forEach((k) => {
      // @ts-ignore
      this[k] = '';
    });
  };

  get isLogged() {
    return !!this.token;
  }
}

export const UserStore = new UserStoreStatic();
