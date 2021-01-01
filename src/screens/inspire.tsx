import { InputItem } from '@ant-design/react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../constants/color';
import { Store } from '../store';
const { Screen, Navigator } = createStackNavigator();

class Draft {
  constructor() {
    makeAutoObservable(this);
  }
  text: string = '';
  creator: string = '';

  from: string = '';

  reset = () => {
    this.text = '';
    this.creator = '';
    this.from = '';
  };
  setText = (text: string) => {
    this.text = text;
  };
  setCreator = (creator: string) => {
    this.creator = creator;
  };
  setFrom = (from: string) => {
    this.from = from;
  };

  publish = async () => {
    if (!this.text) {
      Alert.alert('内容不能为空!!');
      return;
    }
    await Store.favoriteStore.add({
      createdAt: new Date(),
      creator: this.creator || undefined,
      from: this.from || undefined,
      text: this.text,
    });
    Alert.alert('记录成功!!');
    this.reset();
  };
}
const draft = new Draft();
export const InspireScreen: FC = observer(() => {
  const { creator, from, setCreator, setFrom, setText, text } = draft;
  return (
    <View style={styles.root}>
      <View>
        <InputItem
          value={text}
          onChangeText={setText}
          autoCapitalize="none"
          autoFocus
        >
          正文
        </InputItem>
        <InputItem
          value={creator}
          onChangeText={setCreator}
          autoCapitalize="none"
        >
          作者
        </InputItem>
        <InputItem value={from} onChangeText={setFrom} autoCapitalize="none">
          来自
        </InputItem>
      </View>
    </View>
  );
});

export const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});

export const InspireStackScreen: FC = () => (
  <Navigator>
    <Screen
      name="inspire"
      options={{
        title: '灵感',
        ...(Platform.OS === 'android'
          ? { headerTitleStyle: { alignSelf: 'center' } }
          : {}),
        headerLeft: () => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                draft.reset();
              }}
            >
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: Colors.red }}>重置</Text>
              </View>
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          return (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={async () => {
                await draft.publish();
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Text style={{ color: Colors.blue }}>记录</Text>
              </View>
            </TouchableOpacity>
          );
        },
      }}
      component={InspireScreen}
    />
  </Navigator>
);
