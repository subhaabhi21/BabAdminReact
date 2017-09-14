import React from 'react';
import {
					AppRegistry,
					StyleSheet,
					View,
					Modal,
					ToastAndroid,
					Animated
			} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right,Item,Input, Body, Icon, Text, Toast } from 'native-base';
import HomeScreen from '../Login/home';
import { DrawerNavigator } from 'react-navigation';

class SideMenu extends React.Component{
	constructor() {
		super();
	}

	render(){
    return (
     <Button>
       <Icon name='menu' />
     </Button>
    );
	}
}

const styles = StyleSheet.create({
  filterHeader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between' 
  }
})
module.exports = SideMenu;
