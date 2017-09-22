import React from 'react';
import {
          AppRegistry,
          StyleSheet,
          View,
          ActivityIndicator,
       } from 'react-native';
import { Text,Button} from 'native-base';
import {
 StackNavigator,
 DrawerNavigator,
} from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './components/redux_try/reducers';
import AppWithNavigationState from './components/redux_try/AppNavigator';

export default class App extends React.Component {
  store = createStore(AppReducer);
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
AppRegistry.registerComponent('App', () => App);

if (window.document) {
  AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: document.getElementById('react-app')
  });
}
