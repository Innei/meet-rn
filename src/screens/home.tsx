import { createStackNavigator } from '@react-navigation/stack';
import dayjs from 'dayjs';
import React, { ClassicComponent, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../constants/color';
import { HitokotoModel } from '../models';
import { toast } from '../utils/for-android';
import { $http } from '../utils/request';
import { addFavoriteToExistListFromStorage } from '../utils/storage';

const { Navigator, Screen } = createStackNavigator();
export const HomeScreen = ({ navigation }: any) => {
  const today = dayjs().format('YYYY-M-D');

  const [data, setData] = useState<null | HitokotoModel>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    $http
      .get('/', {
        params: {
          c: 'd',
        },
      })
      .then((data) => {
        setData(data as any);
      });
  };

  const buttonRef = useRef<
    ClassicComponent<
      Animatable.AnimatableProperties<ViewStyle> & ViewProps,
      any
    >
  >(null);

  const animateButton = () => {
    if (!buttonRef.current) {
      return;
    }

    (buttonRef.current as any).rotate(800);
  };

  const handleShare = async () => {
    if (!data) {
      return;
    }
    try {
      const result = await Share.share({
        message: `${data.hitokoto}  -- ${data.from || data.creator || '佚名'}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = () => {
    if (!data) {
      return;
    }
    addFavoriteToExistListFromStorage({
      creator: data.creator,
      from: data.from,
      text: data.hitokoto,
      createdAt: new Date().toISOString(),
    }).then((list) => {
      // console.log(list);
      const message = '已添加到喜欢';
      if (Platform.OS === 'ios') {
        Alert.alert(message);
      } else if (Platform.OS === 'android') {
        // toast.setText(message);
        // toast.setVisible(true);
        toast(message);
      }
    });
  };
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
            {data?.from ? (
              <Text style={{ textAlign: 'right' }}>来自 {data.from}</Text>
            ) : null}

            {data?.creator ? (
              <Text style={{ textAlign: 'right' }}>作者 {data.creator}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLike}>
            <Icons name="heart" size={30} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Icons name="share" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.float}>
          <TouchableOpacity
            onPress={() => {
              animateButton();
              fetchData();
            }}
          >
            <Animatable.View style={styles.refresh_button} ref={buttonRef}>
              <Icons name="sync" size={30} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
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
    minHeight: Platform.OS === 'ios' ? '95%' : '100%',
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
  actions: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  float: {
    position: 'absolute',
    right: 20,
    top: '75%',
  },
  refresh_button: {
    backgroundColor: Colors.theme,
    padding: 20,
    borderRadius: 50,
    shadowColor: Colors.deep,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  icon: { marginRight: 48 },

  text: {
    color: Colors.theme,
    fontSize: 24,
  },
});
