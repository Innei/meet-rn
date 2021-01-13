import Clipboard from '@react-native-community/clipboard';
import { createStackNavigator } from '@react-navigation/stack';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import React, {
  ClassicComponent,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Platform,
  Pressable,
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
import AntdIcons from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { Colors } from '../constants/color';
import { SentenceModel } from '../models';
import { useStore } from '../store';
import { toast } from '../utils/for-android';
import { $http } from '../utils/request';

const { Navigator, Screen } = createStackNavigator();

let lock = false;
export const HomeScreen = observer(() => {
  const today = dayjs().format('YYYY 年 M 月 D 日');

  const [data, setData] = useState<null | SentenceModel>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    if (!lock) {
      lock = true;
      $http.get<SentenceModel>('/sentences').then((data) => {
        setData(data as any);
        lock = false;
      });
    }
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

    (buttonRef.current as any).rotate(720);
  };

  const handleShare = async () => {
    if (!data) {
      return;
    }
    try {
      const result = await Share.share({
        message: `${data.text}  -- ${data.from || data.author || '佚名'}`,
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
  const { favoriteStore } = useStore();
  const handleLike = () => {
    if (!data) {
      return;
    }
    if (!isLiked) {
      favoriteStore
        .add({
          author: data.author,
          from: data.from,
          text: data.text,
          createdAt: new Date(),
          id: data.id,
        })
        .then((list) => {
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
    } else {
      favoriteStore.deleteById(data.id);
    }
  };

  const isLiked = useMemo(() => {
    if (!data) {
      return false;
    }
    return favoriteStore.list.some((m) => m.id === data.id);
  }, [data, favoriteStore.list]);
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
            {data ? (
              <Fragment>
                <Pressable
                  onLongPress={() => {
                    Clipboard.setString(data.text);
                    toast('已复制: ' + data.text);
                  }}
                >
                  <Text style={styles.text}>{data.text}</Text>
                </Pressable>
                {data.from ? (
                  <Text style={{ textAlign: 'right' }}>来自 {data.from}</Text>
                ) : null}

                {data.author ? (
                  <Text style={{ textAlign: 'right' }}>作者 {data.author}</Text>
                ) : null}
              </Fragment>
            ) : (
              <Text>载入中...</Text>
            )}
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLike}>
            <Icons
              name="heart"
              size={18}
              style={[styles.icon, { color: isLiked ? Colors.red : undefined }]}
              solid={isLiked}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <AntdIcons name="sharealt" size={18} />
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
              <Icons name="sync" size={16} color={Colors.white} />
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
});

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
    minWidth: '100%',
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
    width: '100%',
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
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: Colors.deep,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }
      : {}),
  },
  icon: { marginRight: 48 },

  text: {
    color: Colors.theme,
    fontSize: 24,
  },
});
