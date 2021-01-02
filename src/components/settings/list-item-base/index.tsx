import React, { FC } from 'react';
import { Button, ButtonProps, View } from 'react-native';
import { sharedStyle } from '../user-item';

export const ListItemGroup: FC = (props) => {
  return (
    // @ts-ignore
    <View style={[{ marginVertical: 16 }, { ...sharedStyle.root }]}>
      {props.children}
    </View>
  );
};

export const ListButtonItem: FC<ButtonProps> = (props) => {
  return (
    <View style={{ paddingVertical: 6 }}>
      <Button {...props} />
    </View>
  );
};
