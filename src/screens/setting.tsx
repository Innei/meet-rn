import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { UserItem } from '../components/settings/user-item';

const { Screen, Navigator } = createStackNavigator();
export const SettingScreen: FC = () => {
  return (
    <View>
      <ScrollView>
        <View style={{ height: 20 }} />
        <UserItem />
      </ScrollView>
    </View>
  );
};

export const SettingStackScreen = () => {
  return (
    <Navigator>
      <Screen
        name="设置"
        options={{
          title: '设置',
        }}
        component={SettingScreen}
      />
    </Navigator>
  );
};
