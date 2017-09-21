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

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right,Item,Input, Body, Icon, Text, Picker, Root, Toast } from 'native-base';

import {listStyles,gridStyles} from './search_css.js';

class CatalogRow extends React.Component{

	  _defaultTransition  = 1000;

   state = {
       _rowOpacity : new Animated.Value(0),
			 currentStyle : {}
   };
   componentDidMount() {
       Animated.timing(this.state._rowOpacity, {
           toValue  : 1,
           duration : this._defaultTransition
       }).start();
			 this.detectView();
   }
	 detectView() {
		 if(this.props.listView)
		 {
			 this.setState({currentStyle: listStyles})
		 }
		else {
			this.setState({currentStyle: gridStyles})
		}
	 }
	render() {
		return(
			<Animated.View  style={[{opacity: this.state._rowOpacity},this.state.currentStyle.catalog]}>
          <Image source={{uri: this.props.item.default_image.url}}
            style={{width: 100, height: 100}} />
          <View style={this.state.currentStyle.catalog_details}>
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
module.exports = CatalogRow;
