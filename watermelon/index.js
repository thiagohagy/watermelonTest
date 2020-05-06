/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import NetInfo from "@react-native-community/netinfo";

import mySync from './sync';

// Subscribe
const unsubscribe = NetInfo.addEventListener(async state => {
  console.log("Is connected to internet?", state.isConnected);

  if (state.isConnected) {
    console.log('run sync with server')
    await mySync();
  }
});

// Unsubscribe
// unsubscribe();

AppRegistry.registerComponent(appName, () => App);


