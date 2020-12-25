import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomNavigationTabSimpleUsageShowcase as BottomNavigationTab } from '../tabbar';

export const AppNavigator = () => (
  <NavigationContainer>
    <BottomNavigationTab />
  </NavigationContainer>
);
