import React from 'react';
import {
					AppRegistry,
					StyleSheet,
					View,
					TextInput,
					ActivityIndicator,
					KeyboardAvoidingView,
					FlatList,
			} from 'react-native';

import Api from '../app_common/common';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base'

class PurchasesScreen extends React.Component{
	 	 static navigationOptions = {
    drawerLabel: 'Purchases',
    drawerIcon: ({ tintColor }) => (
      <Icon name='ios-cash'
      />
    ),
  };

	constructor() {
		console.log("inn constructor of Purchase")
		super();

		this.state = {
      purchases : []
		};
		this.getPurchases();
	}

	getPurchases(){
		console.log("in get purchases")
		Api.call_api("purchases/get_purchases.json","","GET").then((response) => {
			console.log("response :",response)
			if(response.status == 'success'){
        this.setState({purchases : response.result})
			}
			else{
				if(response.error)
					alert(response.error[0]);
			}
		});
	}

  _keyExtractor = (item, index) => item.number;

	render(){
    if (Api.isLoading) {
       return (
				 <Container>
					 <Header>
		         <Left>
		           <Button transparent>
		             <Icon name='menu'  onPress={() =>  this.props.navigation.navigate('DrawerOpen')}/>
		           </Button>
		         </Left>
		         <Body>
		           <Title>Header</Title>
		         </Body>
		         <Right />
		       </Header>
	       	<Content padder>
         <View style={{flex: 1, justifyContent: 'center'}}>
           <ActivityIndicator />
         </View>
			 </Content>
		 	</Container>
			)
    }

     return (

			 <Container>
				 <Header>
	         <Left>
	           <Button transparent>
	             <Icon name='menu'  onPress={() =>  this.props.navigation.navigate('DrawerOpen')}/>
	           </Button>
	         </Left>
	         <Body>
	           <Title>Header</Title>
	         </Body>
	         <Right />
	       </Header>
       	<Content padder>
		      <View style={styles.container}>
		        <FlatList
		          data={this.state.purchases}
		          keyExtractor={this._keyExtractor}
		          renderItem={({item}) =>
		            <View style = {styles.purchase}>
		              <Text >Purchase # : {item.number}</Text>
		              <Text >Status : {item.status}</Text>
		              <Text >Total : {item.total.value}</Text>
		              <Text >Email : {item.email}</Text>
		            </View>
		          }
		        />
		      </View>
					</Content>
				</Container>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  purchase: {
    flex: 1,
    backgroundColor: '#dedede',
    marginBottom: 10,
    padding:10

  },
	buttonContainer: {
		backgroundColor: '#4286f4',
		paddingVertical: 15
	},
	buttonText: {
		textAlign: 'center',
		color: '#ffffff'
	}
});

module.exports = PurchasesScreen;
