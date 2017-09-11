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
					ToastAndroid
			} from 'react-native';

import Api from '../app_common/common';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right,Item,Input, Body, Icon, Text, Picker, Root, Toast } from 'native-base'
import CatalogRow from './catalog_row_search.js';
import FacetOptions from './facet_sort_options.js';


class SearchScreen extends React.Component{
	static navigationOptions = {
	 title: 'Search',
 	};

	constructor() {
		super();
		this.state = {
      variants : [],
			query : "",
			browse_node : "",
			browse_node_tree : {},
			page : 1,
			per_page : 20,
			selected_facets : {},
			current_sort_option : "relevance",
			sort_options : [{
											code: "relevance",
											selected: false,
											text: "Sort Relevance"
										}, {
											code: "price_in_desc",
											selected: false,
											text: "Sort Price High to Low"
										}, {
											code: "price_in_asc",
											selected: false,
											text: "Sort Price Low to High"
										}],
			in_wishlist: {},
			priceMinChoosen: 0,
			priceMaxChoosen: 7000
			}
		this.search();
	}

	changeSortOption(value:string){
		this.setState({ variants : [],
										page : 1,
										current_sort_option : value
									} , () => this.search())
	}

	toggleWishlist(key){
		let data = {...this.state.in_wishlist}; 
		data[key] = !(this.state.in_wishlist[key]);
		this.setState({in_wishlist: data} , () => console.log("wishlist item: ",this.state.in_wishlist[key]));
	}

  setPriceRange(values){
   	console.log("in setpricerange of search: ",values)
    this.setState({
      priceMinChoosen: values[0],
      priceMaxChoosen: values[1],
      page: 1,
      variants : []
    }, () => this.search());
  }

	search(){
	
		this.state.query = !this.state.query || typeof(this.state.query)!="string" ? "" : this.state.query;
		this.state.browse_node = !this.state.browse_node || typeof(this.state.browse_node)!="string" ? "home" : this.state.browse_node;
		this.state.page = !this.state.page || typeof(this.state.page)!="number" ? 1 : this.state.page;
		this.state.per_page = !this.state.per_page || typeof(this.state.per_page)!="number" || this.state.per_page%2!=0 ? 20 : this.state.per_page;
		this.state.selected_facets = !this.state.selected_facets || typeof(this.state.selected_facets)!="object" ? {} : this.state.selected_facets;


		var url = 'http://amulonline.com/api/v1/browse_nodes/'+this.state.browse_node+'/search.json';

		var params = JSON.parse(JSON.stringify(this.state.selected_facets));
		params["headers[_token]"] = Api.getHeaderToken();

		params['q'] = this.state.query ;
		params['page'] = this.state.page ;
		params['per_page'] = this.state.per_page;
		params['sort_type'] = this.state.current_sort_option;
		params['price.min'] = this.state.priceMinChoosen;
		params['price.max'] = this.state.priceMaxChoosen;			

		if(params) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + Api.queryParams(params);
    }

		var fetch_type='GET';
		Api.isLoading = true;
		console.log("url :",url);
		fetch(url,{method: fetch_type}).then((response) => response.json()).then((response) => {
			Api.isLoading = false;
			if(response.status == 'success'){
				this.setState({
					variants : [...this.state.variants,...response.result.variants],
					browse_node : response.result.facets.browse_nodes.title,
					browse_node_tree : response.result.facets.browse_nodes,
					current_sort_option : response.result.current_sort_option
				})
 				var temp = {}
				response.result.variants.forEach(function(element) {
				    temp[element.title] = false			   
				});
				 this.setState(prevState => ({in_wishlist: {
        ...prevState.in_wishlist,...temp}
    }))


			}
			else{
				if(response.error)
					this.setState({error : response.error[0]});
			}
		})
	}

	loadMore = () => {
		this.setState({
			page: this.state.page+1,
		}, () => {
			this.search();
		})
	}

  _keyExtractor = (item, index) => item.variant_id;


	render(){

     return (
     	<Root>
			 <Container>
					 <Header>
					 	<View style={{flex: 1 , flexDirection: 'row' , alignItems : 'center' , justifyContent: 'space-between'}}>
		           <Button transparent>
		             <Icon name='menu' />
		           </Button>
		       
							<Item style={{width: 250 , backgroundColor:'#fff' , height : 50}}>
			          <Icon name="ios-search" />
			          <Input placeholder="Search"
									 onChangeText={(text) => this.setState({query : text , variants : [] , in_wishlist : {}})}/>
			          <Button transparent onPress={() => this.search()}>
			            <Text>Search</Text>
			          </Button>
							</Item>

							<FacetOptions priceMinChoosen={this.state.priceMinChoosen} priceMaxChoosen={this.state.priceMaxChoosen} setPriceRange={(values) => this.setPriceRange(values)}/>
						</View>
	        </Header>
					<Picker
            mode="dropdown"
            selectedValue={this.state.current_sort_option}
						onValueChange={this.changeSortOption.bind(this)}
          >
            {
							this.state.sort_options.map( (item) =>
							<Item label={item.text} value={item.code} key={item.code} />
							)
						}
          </Picker>
		      <View style={styles.container}>
							{ Api.isLoading ?  <ActivityIndicator /> : null}
							<FlatList
			          data={this.state.variants}
			          keyExtractor={this._keyExtractor}
								onEndReached = {this.loadMore}
								onEndThreshold = {20}
			          renderItem={({item, index}) => <CatalogRow item={item} in_wishlist={this.state.in_wishlist} toggleWishlist={() => this.toggleWishlist(item.title)}/> }
			        />
		      </View>
				</Container>
			</Root>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    alignItems: 'stretch',
  },
  catalog: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding:10,
		backgroundColor:'#fff'

  },
  catalog_details: {
  	flex: 1,
  	flexDirection: 'column',
  	backgroundColor:'#fff'
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

module.exports = SearchScreen;
