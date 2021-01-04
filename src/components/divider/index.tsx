import { FC } from 'react';
import { View } from 'react-native-animatable';
import React from 'react';
export const Divider: FC = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 0.5,
        borderTopWidth: 0.3,
        borderTopColor: '#bbb',
      }}
    />
  );
};
