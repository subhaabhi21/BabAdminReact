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



const AppStart = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
});


export default AppStart;