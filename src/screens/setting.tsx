/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { FC, Fragment, useCallback, useEffect } from 'react';
import { Alert, View } from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { Divider } from '../components/divider';
import { Item } from '../components/item';
import {
  ListButtonItem,
  // ListButtonItem,
  ListItemGroup,
} from '../components/settings/list-item-base';
import { LoginWidget } from '../components/settings/login-widget';
import { UserItem } from '../components/settings/user-item';
import { useStore } from '../store';

const { Screen, Navigator } = createStackNavigator();
export const SettingScreen: FC = observer(() => {
  const {
    userStore: { login, isLogged, token, logout },
    syncStore,
    favoriteStore,
  } = useStore();
  const handleLogin = useCallback(
    (username, password) => {
      login({ username, password });
    },
    [login],
  );
  const navigator = useNavigation();
  useEffect(() => {
    syncStore.fetch();
  }, []);
  return (
    <View style={{ minHeight: '100%' }}>
      <ScrollView>
        <View style={{ height: 20 }} />
        {isLogged ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('真的要离开吗?', '登出后仍可离线使用', [
                  {
                    onPress: () => {
                      logout();
                    },
                    text: '嗯!',
                  },
                  {
                    text: '再想想吧',
                  },
                ]);
              }}
            >
              <UserItem />
            </TouchableOpacity>

            <ListItemGroup>
              <ListButtonItem
                title={'立即上传'}
                onPress={() => {
                  Alert.alert('是否上传', '上传将会用本地数据覆盖云端数据', [
                    {
                      text: '嗯',
                      onPress: () => {
                        syncStore.sync(
                          favoriteStore.list.map((item) => ({
                            nonce: item.id,
                            text: item.text,
                            type: item.type,
                            author: item.author,
                            from: item.from,
                          })),
                        );
                      },
                      style: 'destructive',
                    },
                    {
                      text: '不了',
                      onPress: () => {},
                    },
                  ]);
                }}
              />
              {/* <Divider /> */}
              <ListButtonItem
                title={'立即下载'}
                onPress={() => {
                  const list = syncStore.list;
                  const newList = list.map((item) => ({
                    ...item,
                    id: item.likedId ?? item.id,
                  }));
                  favoriteStore.addMore(newList);
                }}
              />
            </ListItemGroup>
          </View>
        ) : (
          <LoginWidget onLogin={handleLogin} />
        )}
        <ListItemGroup>
          <FlatList
            data={syncStore.list}
            renderItem={(listRenderItem) => {
              return (
                <Fragment>
                  <Item
                    item={listRenderItem.item}
                    onDelete={async (id) => {
                      await syncStore.delete(id);
                    }}
                    onPress={(id) => {
                      navigator.navigate('item-modal', {
                        item: listRenderItem.item,
                      });
                    }}
                  />
                  <Divider />
                </Fragment>
              );
            }}
          />
        </ListItemGroup>
      </ScrollView>
    </View>
  );
});

export const SettingStackScreen = () => {
  return (
    <Navigator>
      <Screen
        name="@me"
        options={{
          title: '我',
        }}
        component={SettingScreen}
      />
    </Navigator>
  );
};
