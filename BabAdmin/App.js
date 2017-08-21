import React from 'react';
import { 
          AppRegistry,
          StyleSheet, 
          Text, 
          View,
          Navigator,
       } from 'react-native';
import Login from './components/Login/login';
import Home from './components/Login/home';

export default class App extends React.Component {

  renderScene(route, navigator){
    console.log("route: ",route)
    if(route.name == 'Login'){
      return <Login navigator={navigator} />
    }
    else if(route.name == 'Home'){
      return <Home navigator={navigator} />
    }
  }

  render() {
    console.log("in render")
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
