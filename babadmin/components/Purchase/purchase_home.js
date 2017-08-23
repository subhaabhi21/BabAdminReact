import React from 'react';
import { 
					AppRegistry,
					StyleSheet,
					View,
					Image,
          ActivityIndicator,
          ScrollView,
			} from 'react-native';
import api from '../app_common/common';
import { Container, Header, Content, Badge, Text, Icon, Button, Card, CardItem } from 'native-base';

class Purchase extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      purchases: {},
      loadingPurchase: true,
    };

  //this.getPurchases();
   this.getDummyPurchase();

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

  getDummyPurchase() {
    api.get_dummy_purchases().then((response) => {
         this.setState({
          purchases: response.result,
          loadingPurchase: false,
        })
        console.log("done setting purchase")
      }).catch((error) => {
        console.error(error);
      });
  }

	render(){
    if(!this.state.loadingPurchase){
		 return (
        <ScrollView>
          <View style={styles.scroll_container}>
               <Container>
                <Content>
                    <Card dataArray={this.state.purchases}
                          renderRow={(purchase) =>
                            <CardItem>
                                <Text>{purchase.number}</Text>
                                <Badge style={styles.badge_style} textStyle={styles.badge_text}><Text>{purchase.status}</Text></Badge>
                            </CardItem>
                        }>
                    </Card>
                </Content>
            </Container>
                    
          </View>
        </ScrollView>
      );
    }
    else
    {
       return (
        <View style={styles.activity_indicator}>
          <Text>Loading Purchase...</Text>  
          <ActivityIndicator/>
        </View>
      );
    }
	}
}

const styles = StyleSheet.create({
 scroll_container: {
    backgroundColor: '#fff',
    alignItems: 'center',   
  },
  activity_indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pur_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30, 
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
  },
  badge_style: {
   backgroundColor: '#34c4db', 
  },
  badge_text: {
    color: 'white',
  },
});

module.exports = Purchase;