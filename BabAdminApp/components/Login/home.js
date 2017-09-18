import React from 'react';
import {
					AppRegistry,
					StyleSheet,
					View,
					TextInput,
					TouchableOpacity,
					KeyboardAvoidingView,
			} from 'react-native';

import Api from '../app_common/common';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import AppHeader from '../app_common/app_header.js';

class HomeScreen extends React.Component{
 	 static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Icon name='ios-home'
      />
    ),
  };


	constructor() {
			console.log("inn constructor of Home")
		super();

	}

	render(){
		 return (
			 <Container>
			  <AppHeader />
        <Content padder>
				 	<View style = {styles.container}>
						<Text style={{fontSize:36, marginBottom:20}}>Admin Home </Text>
						<Button bordered block style={styles.button}
								onPress={() => this.props.navigation.navigate("Purchases")}
						>
							<Text>MANAGE PURCHASES </Text>
						</Button>
						<Button bordered block style={styles.button}
								onPress={() => this.props.navigation.navigate("Search")}
						>
							<Text>SEARCH CATALOG </Text>
						</Button>
					</View>
				</Content>
			</Container>
    );
	}
}


module.exports = HomeScreen;
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : '#fff',
  },
	button:{
		margin : 10
	}
})
