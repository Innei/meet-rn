import { createContext } from 'react';
import { ToastAndroid } from 'react-native';

export const toast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    200,
  );
};
