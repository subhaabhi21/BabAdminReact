import React from 'react';
import {
					AppRegistry,
					StyleSheet,
					View,
					TextInput,
					ActivityIndicator,
					KeyboardAvoidingView,
					FlatList,
					Image,
					Modal,
					ToastAndroid,
					Animated
			} from 'react-native';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right,Item,Input, Body, Icon, Text, Picker, Root, Toast } from 'native-base'

class CatalogRow extends React.Component{

	  _defaultTransition  = 1000;

   state = {
       _rowOpacity : new Animated.Value(0)
   };

   componentDidMount() {
       Animated.timing(this.state._rowOpacity, {
           toValue  : 1,
           duration : this._defaultTransition
       }).start()
   }

	render() {
		return(
			<Animated.View  style={[{opacity: this.state._rowOpacity},styles.catalog]}>
          <Image source={{uri: this.props.item.default_image.url}}
            style={{width: 100, height: 100}} />
          <View style={styles.catalog_details}>
            <Text > {this.props.item.title}</Text>
            <Text >Price : {this.props.item.final_price.value}</Text>
          </View>
          <Button transparent onPress={() => {this.props.toggleWishlist(this.props.item.title)}}>
              <Icon name = { this.props.in_wishlist[this.props.item.title] ? 'ios-heart' : 'ios-heart-outline'} />                        
          </Button>
       </Animated.View>
		);
	}

}


const styles = StyleSheet.create({
  catalog: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding:10,
		backgroundColor:'#fff'
  },
  catalog_details: {
  	flex: 1,
  	flexDirection: 'column',
  	backgroundColor:'#fff'
  }
});

module.exports = CatalogRow;