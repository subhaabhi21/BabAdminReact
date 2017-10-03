import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon,Badge } from 'native-base'

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
        <View style={{height: 40,backgroundColor:'#2f3da8',flexDirection:'row',alignItems:'center'}}>
          <Button>
            <Icon name='menu'  onPress={() =>  this.props.navigation.navigate('DrawerOpen')}/>
          </Button>
          <Text style={{color: '#fff',width:200,alignSelf: 'center'}}>App Header</Text>
        </View>
    );
    // return (
    //    <Header>
    //      <Left>
    //        <Button transparent>
    //          <Icon name='menu'  onPress={() =>  this.props.navigation.navigate('DrawerOpen')}/>
    //        </Button>
    //      </Left>
    //      <Body>
    //        <Title>App Header</Title>
    //      </Body>
    //      <Right />
    //    </Header>
    // );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : '#fff',
  },
});

module.exports = AppHeader;
