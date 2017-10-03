import React from 'react';
import {
          AppRegistry,
          StyleSheet,
          View,
          ActivityIndicator,
       } from 'react-native';

import {
 StackNavigator,
 DrawerNavigator,
} from 'react-navigation';
import LoginScreen from './components/Login/login';
import HomeScreen from './components/Login/home';
import PurchasesScreen from './components/Purchase/purchases';
import SearchScreen from './components/Search/search';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const AdminApp = DrawerNavigator({
  Search : {screen : SearchScreen},
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Purchases: { screen: PurchasesScreen }
  },{
    mode : 'card',
    headerMode : 'float'
  }
);

export default class App extends React.Component {
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
      <AdminApp />
   )
  }
}
