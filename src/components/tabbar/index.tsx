import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
// @ts-ignore
import Icons from 'react-native-vector-icons/FontAwesome5';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { HomeStackScreen } from '../../screens/home';
import { InspireStackScreen } from '../../screens/inspire';
import { FavoriteStackScreen } from '../../screens/favorite';

const Tab = createBottomTabNavigator();
export const BottomNavigationTabSimpleUsageShowcase = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: { paddingTop: 10 },
        allowFontScaling: true,
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

          tabBarIcon: ({ color, size, focused }) => (
            <Icons
              name="circle-notch"
              color={color}
              size={size}
              solid={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="inspire"
        component={InspireStackScreen}
        options={{
          title: '灵感',
          tabBarIcon: ({ color, size, focused }) => (
            <Icons name="lightbulb" color={color} size={size} solid={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="favorite"
        component={FavoriteStackScreen}
        options={{
          title: '喜欢',
          tabBarIcon: ({ color, size, focused }) => (
            <>
              {focused ? (
                <AntdIcons name="heart" color={color} size={size} />
              ) : (
                <AntdIcons name="hearto" color={color} size={size} />
              )}
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
