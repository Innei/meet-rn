import { InputItem } from '@ant-design/react-native';
import React, { FC, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ListButtonItem } from '../list-item-base';
import { sharedStyle } from '../user-item';

export const LoginWidget: FC<{
  onLogin: (username: string, password: string) => void;
}> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.root}>
      <View>
        <InputItem
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoFocus
        >
          用户名
        </InputItem>
        <InputItem
          value={password}
          type="password"
          onChangeText={setPassword}
          autoCapitalize="none"
        >
          密码
        </InputItem>
      </View>

      <ListButtonItem
        onPress={() => {
          props.onLogin(username, password);
        }}
        title={'登陆'}
        disabled={!username.length || !password.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // @ts-ignore
  root: { ...sharedStyle.root, marginVertical: 16 },
});
