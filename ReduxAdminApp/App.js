import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './components/redux_comps/reducers';
import AppWithNavigationState from './components/app_common/app_home';
import React, {Component} from 'react';
import {
          AppRegistry,
          StyleSheet,
          View,
          ActivityIndicator,
       } from 'react-native';

export default class App extends Component {
  store = createStore(AppReducer);

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
