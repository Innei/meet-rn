/*
 * @Author: Innei
 * @Date: 2020-12-24 22:06:56
 * @LastEditTime: 2021-01-13 19:22:18
 * @LastEditors: Innei
 * @FilePath: /AwesomeTSProject/index.js
 * @Mark: Coding with Love
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { isAndroid } from './src/utils';
import { BackHandler } from 'react-native';

if (isAndroid) {
  BackHandler.addEventListener('hardwareBackPress', function () {
    BackHandler.exitApp();

    return true;
  });
}

AppRegistry.registerComponent(appName, () => App);
