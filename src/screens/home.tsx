import { createStackNavigator } from '@react-navigation/stack';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HitokotoModel } from '../models';
import { $http } from '../utils';
const { Navigator, Screen } = createStackNavigator();
export const HomeScreen = ({ navigation }: any) => {
  const today = dayjs().format('YYYY-M-D');

  const [data, setData] = useState<null | HitokotoModel>(null);
  useEffect(() => {
    $http
      .get('/', {
        params: {
          c: 'd',
        },
      })
      .then((data) => {
        setData(data as any);
      });
  }, []);
  console.log(data);

  return (
    <SafeAreaView>
      <View
        style={[
          styles.root,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <View>
          <View>
            <Text style={styles.header}>{today}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>{data?.hitokoto}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export const HomeStackScreen = () => (
  <Navigator>
    <Screen
      name="Home"
      component={HomeScreen}
      options={{ headerTitle: '遇见' }}
    />
  </Navigator>
);
const styles = StyleSheet.create({
  root: {
    minHeight: '100%',
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    color: '#bbb',
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  content: {
    marginVertical: 12,
    paddingHorizontal: 30,
  },
  text: {
    color: '#438cb3',
    fontSize: 24,
  },
});
