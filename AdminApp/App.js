import React from 'react';
import {
          AppRegistry,
          StyleSheet,
          View,
          ActivityIndicator,
       } from 'react-native';
import { Text,Button} from 'native-base'

import {
 StackNavigator,
} from 'react-navigation';

export default class App extends React.Component {
  constructor() {
    super();
    console.log("in constructor")  
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

  search(){
    console.log("in search")
     var url = 'http://amulonline.com/api/v1/browse_nodes/home/search.json?headers%5B_token%5D=&q=&page=1&per_page=20';

    console.log("url: ",url)
      var fetch_type = 'GET';
       fetch(url,{method: fetch_type})
          .then((response) => console.log("resp: ",response))
          .catch((error) => console.error("err: ",error))
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
      <View style={{height: 1000,width: 1000,flex:1}}>
        <Text>hi</Text>
         <Button onPress={() => this.search()}>
                  <Text>Search</Text>
                </Button>
      </View>
   )
  }
}
