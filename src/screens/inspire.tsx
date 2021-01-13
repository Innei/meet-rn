import { InputItem } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, Fragment } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-animatable';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from '../components/divider';
import { Item } from '../components/item';
import { Colors } from '../constants/color';
import { SentenceType } from '../models';
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
      author: this.creator || undefined,
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
  const navigator = useNavigation();

  const userCreatedList = Store.favoriteStore.list.filter(
    (i) => i.type === SentenceType.USER,
  );
  return (
    <View style={styles.root}>
      <View>
        <InputItem value={text} onChangeText={setText} autoCapitalize="none">
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

      {!!userCreatedList.length && (
        <View
          style={{
            marginTop: 50,
            height: '100%',
            backgroundColor: '#fff',
            marginHorizontal: -20,
          }}
        >
          <ScrollView style={{ paddingBottom: 100 }}>
            {userCreatedList
              .filter((i) => i.type === SentenceType.USER)
              .sort((b, a) => a.createdAt.getTime() - b.createdAt.getTime())
              .map((i) => (
                <Fragment>
                  <Item
                    item={i}
                    onDelete={(id) => {
                      Store.favoriteStore.deleteById(id);
                    }}
                    onPress={(id) => {
                      navigator.navigate('item-modal', {
                        item: i,
                      });
                    }}
                  />

                  <Divider />
                </Fragment>
              ))}
          </ScrollView>
        </View>
      )}
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
