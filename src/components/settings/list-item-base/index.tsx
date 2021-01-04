import React, { FC, Fragment } from 'react';
import { Button, ButtonProps, View } from 'react-native';
import { Colors } from '../../../constants/color';
import { Divider } from '../../divider';

export const ListItemGroup: FC<{ divider?: boolean }> = (props) => {
  const { divider = true } = props;
  // const count = React.Children.count(props.children);
  const children = React.Children.toArray(props.children);
  const count = children.length;
  return (
    // @ts-ignore
    <View style={[{ marginVertical: 16 }, { ...sharedStyle.root }]}>
      {children.map((child, index) => {
        return (
          <Fragment key={index}>
            {child}
            {divider && index !== count - 1 ? <Divider /> : null}
          </Fragment>
        );
      })}
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

export const sharedStyle = {
  root: {
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: '#bbb',
    backgroundColor: Colors.fff,
    position: 'relative',
  },
};
