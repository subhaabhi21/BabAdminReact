import React from 'react';
import { 
					AppRegistry,
					StyleSheet,
					Text,
					View,
					Button,
					Image
			} from 'react-native';
import api from '../app_common/common';

class Purchase extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      purchases: {},
    };

   this.getPurchases();

  }

  getPurchases(){
    var action = '/api/v1/purchases/get_purchases.json';
    var fetch_type = 'GET';
    var params = {
                   search:{
                         status_eq: '',
                         email_eq: 'a@a.com',
                         phone_number_eq: ''
                   }
                  }

    api.call_api(action,params,fetch_type).then((response) => {
         this.setState({
          purchases: response,
        })
        console.log("purchase resp; ",response)
        
      }).catch((error) => {
        console.error(error);
      });
  


  }

	render(){
		 return (
      <View style={styles.container}>
        <Text>in purchase</Text>
      
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
  	height: 600,
    backgroundColor: '#fff',
    alignItems: 'center',   
  },

});

module.exports = Purchase;