import { createStackNavigator } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const { Screen, Navigator } = createStackNavigator();
export const InspireScreen: FC = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.root}>
      <View>
        <Text>正文</Text>
        <TextInput value={text} onChangeText={setText} />
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
});

export const InspireStackScreen: FC = () => (
  <Navigator>
    <Screen
      name="inspire"
      options={{ title: '灵感' }}
      component={InspireScreen}
    />
  </Navigator>
);
