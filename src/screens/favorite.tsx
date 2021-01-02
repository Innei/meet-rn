import { useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
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

  const navigator = useNavigation();

  return (
    <View style={{ minHeight: '100%' }}>
      {list.length > 0 ? (
        <FlatList
          data={list}
          renderItem={(listRenderItem) => (
            <Item
              item={listRenderItem.item}
              onDelete={(id) => {
                favoriteStore.deleteById(id);
              }}
              onPress={(id) => {
                navigator.navigate('item-modal', { item: listRenderItem.item });
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

export const ModalView: FC<{
  route: { key: string; name: string; params: { item?: FavoriteModel } };
}> = (props) => {
  const item = props.route.params.item;
  console.log(item);
  const navigator = useNavigation();
  if (!item) {
    navigator.navigate('home');
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
      }}
    >
      <Text
        style={{
          color: Colors.theme,
          fontSize: 24,
        }}
      >
        {item.text}
      </Text>

      <Text style={{ alignSelf: 'flex-end' }}>来自 {item.from}</Text>

      <Text style={{ alignSelf: 'flex-end' }}>作者 {item.author}</Text>
    </View>
  );
};

const RootStack = createStackNavigator();
export const _FavoriteStackScreen: FC = () => (
  <Navigator>
    <Screen
      name="favorite"
      options={{ title: '喜欢' }}
      component={FavoriteScreen}
    />
  </Navigator>
);

export const FavoriteStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
  >
    <RootStack.Screen
      component={_FavoriteStackScreen}
      name={'child-stack'}
      options={{ headerShown: false, title: '喜欢' }}
    />
    <RootStack.Screen
      component={ModalView}
      name={'item-modal'}
      options={{ title: '预览' }}
    />
  </RootStack.Navigator>
);
