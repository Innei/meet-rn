import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
// @ts-ignore
import Icons from 'react-native-vector-icons/FontAwesome5';
import { HomeStackScreen } from '../../screens/home';

const Tab = createBottomTabNavigator();
export const BottomNavigationTabSimpleUsageShowcase = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: { paddingTop: 10 },
        safeAreaInsets: {
          bottom: Platform.OS === 'android' ? 10 : undefined,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: '遇见',
          tabBarIcon: ({ color, size }) => (
            <Icons name="home" color={color} size={size} solid />
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};
