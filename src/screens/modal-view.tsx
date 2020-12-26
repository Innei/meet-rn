import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
const { Screen } = createStackNavigator();

export const ModalView = () => null;
export const Modal = () => {
  return <Screen name="item-modal" component={ModalView} />;
};
