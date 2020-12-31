import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/color';

interface UserItemProps {}

export const UserItem: FC<UserItemProps> = (props) => {
  return (
    <View style={styles.root}>
      <View style={[{ width: 100, padding: 10, marginLeft: 10 }]}>
        <View
          style={[
            styles.rounded,
            {
              height: '100%',
              backgroundColor: Colors.gray,
              position: 'relative',
            },
          ]}
        >
          <Image
            source={{
              uri: 'https://tu-1252943311.file.myqcloud.com/avatar.png',
            }}
            style={[
              styles.rounded,
              {
                height: '100%',
                width: '100%',
                resizeMode: 'cover',
              },
            ]}
          />
        </View>
      </View>
      <View
        style={{
          left: 0,
          // backgroundColor: Colors.dark,
          height: '100%',
          position: 'absolute',
          paddingLeft: 130,
          zIndex: -1,
          display: 'flex',

          justifyContent: 'center',
        }}
      >
        <View>
          <Text style={{ fontSize: 24, color: Colors.blue }}>Innei</Text>
          <Text style={{}}>已同步 30 条</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 100,
    width: '100%',
    borderBottomWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: '#bbb',
    backgroundColor: Colors.fff,
    position: 'relative',
  },
  rounded: {
    borderRadius: 100,
  },
});
