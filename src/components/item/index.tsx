import dayjs from 'dayjs';
import React, { PureComponent } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Colors } from '../../constants/color';
import { FavoriteModel } from '../../models';
export interface ItemProps {
  item: FavoriteModel;
  onDelete: (id: string) => void;
  onPress: (id: string) => void;
}

export class Item extends PureComponent<ItemProps, any> {
  renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: any,
    onPress: () => void,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      onPress();
      this.close();
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  _animated = new Animated.Value(1);

  renderRightActions = (progress: Animated.AnimatedInterpolation) => (
    <View
      style={{
        width: 64,
        flexDirection: 'row',
      }}
    >
      {this.renderRightAction('删除', '#dd2c00', 64, progress, () => {
        Animated.timing(this._animated, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          this.props.onDelete(this.props.item.id);
        });
      })}
    </View>
  );
  _swipeableRow: any = null;
  updateRef = (ref: any) => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  render() {
    const { item } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        <TouchableHighlight
          onPress={() => {
            this.props.onPress(this.props.item.id);
          }}
          activeOpacity={0.6}
          underlayColor={Colors.overlay}
        >
          <Animated.View
            style={[
              styles.root,
              {
                transform: [{ scaleY: this._animated }],
              },
            ]}
          >
            <View>
              <Text
                style={styles.content}
                ellipsizeMode={'tail'}
                numberOfLines={2}
              >
                {item.text}
              </Text>
            </View>
            <View style={styles.wrap}>
              <Text style={styles.date}>
                {dayjs(item.createdAt).format('YYYY-M-D')}
              </Text>
              <Text
                style={styles.from}
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >
                {item.from || item.author || '佚名'}
              </Text>
            </View>
          </Animated.View>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.3,
    position: 'relative',
  },
  content: {
    fontSize: 20,
    // maxWidth: '90%',
  },
  date: {
    color: Colors.dark,
    fontWeight: '200',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    width: '100%',
    marginTop: 5,
  },
  from: {
    fontWeight: '300',
    fontSize: 16,
    flexShrink: 0,
    color: Colors.deep,
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
