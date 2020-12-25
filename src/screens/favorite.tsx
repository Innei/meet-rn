import { createStackNavigator } from '@react-navigation/stack';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from '../components/item';
import { Colors } from '../constants/color';
import { FavoriteModel } from '../models';
import { useStore } from '../store';

const { Screen, Navigator } = createStackNavigator();
export const FavoriteScreen: FC = observer(() => {
  const { favoriteStore } = useStore();
  const list = favoriteStore.list;

  return (
    <View>
      {list.length > 0 ? (
        <FlatList
          data={list}
          renderItem={(item) => (
            <Item
              item={item.item}
              onDelete={(id) => {
                favoriteStore.deleteById(id);
              }}
            />
          )}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
          }}
        >
          <Text style={{ color: Colors.deep, fontSize: 18 }}>
            你还没有任何喜欢的句子哦 QAQ
          </Text>
        </View>
      )}
    </View>
  );
});

export const FavoriteStackScreen: FC = () => (
  <Navigator>
    <Screen
      name="favorite"
      options={{ title: '喜欢' }}
      component={FavoriteScreen}
    />
  </Navigator>
);
