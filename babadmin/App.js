import React from 'react';
import { 
          AppRegistry,
          StyleSheet, 
          Text, 
          View,
       } from 'react-native';
import Login from './components/Login/login';
import Home from './components/Login/home';

export default class App extends React.Component {

  render() {
      return (   
       <View style={styles.container}>
        <Login />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
