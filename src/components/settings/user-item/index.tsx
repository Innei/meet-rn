import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/color';
import { useStore } from '../../../store';

interface UserItemProps {}

export const UserItem: FC<UserItemProps> = observer((props) => {
  const {
    userStore: { user },
    syncStore,
  } = useStore();
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
              uri: user.avatar,
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
          <Text style={{ fontSize: 24, color: Colors.blue }}>
            {user.username}
          </Text>
          <Text style={{}}>已同步 {syncStore.list.length} 条</Text>
        </View>
      </View>
    </View>
  );
});

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
