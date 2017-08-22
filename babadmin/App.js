import React from 'react';
import { 
          AppRegistry,
          StyleSheet, 
          Text, 
          View,
       } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login/login';
import Home from './components/Login/home';
import Purchase from './components/Purchase/purchase_home';



const AppStart = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  Purchases: {screen: Purchase},
});


export default AppStart;