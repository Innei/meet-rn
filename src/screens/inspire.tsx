import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';

const { Screen, Navigator } = createStackNavigator();
export const InspireScreen: FC = () => {
  return null;
};

export const InspireStackScreen: FC = () => (
  <Navigator>
    <Screen
      name="inspire"
      options={{ title: '灵感' }}
      component={InspireScreen}
    />
  </Navigator>
);
