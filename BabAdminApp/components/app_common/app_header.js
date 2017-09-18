import React from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Badge } from 'native-base'

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  render() {
    return (
       <Header>
         <Left>
           <Button transparent>
             <Icon name='menu'  onPress={() =>  this.props.navigation.navigate('DrawerOpen')}/>
           </Button>
         </Left>
         <Body>
           <Title>App Header</Title>
         </Body>
         <Right />
       </Header>
    );
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
