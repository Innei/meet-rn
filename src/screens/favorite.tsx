import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

const { Screen, Navigator } = createStackNavigator();
export const FavoriteScreen: FC = () => {
  return null;
};

export const FavoriteStackScreen: FC = () => (
  <Navigator>
    <Screen
      name="favorite"
      options={{ title: '喜欢' }}
      component={FavoriteScreen}
    />
  </Navigator>
);
