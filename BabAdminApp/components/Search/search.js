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

class SearchScreen extends React.Component{
	static navigationOptions = {
	 title: 'Search',
 	};

	constructor() {
			console.log("in constructor of Search")
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
			filter_modal_visible: false
			}
		this.search();
	}

	changeSortOption(value:string){
		this.setState({ variants : [],
										page : 1,
										current_sort_option : value
									} , () => this.search())
	}




	search(){
		console.log("query",this.state.query)

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

  showFilterModal(){
  	console.log("in showFilterModal")
  	this.setState({
			filter_modal_visible: true
		})
  }

	render(){

     return (
     	<Root>
			 <Container>
					 <Header padder searchBar rounded>
						 <Left>
		           <Button transparent>
		             <Icon name='menu' />
		           </Button>
		         </Left>
							<Item>
		            <Icon name="ios-search" />
		            <Input placeholder="Search"
								 onChangeText={(text) => this.setState({query : text})}/>
		          <Button transparent onPress={() => this.search()}>
		            <Text>Search</Text>
		          </Button>
						</Item>
						<Right>
							<Button transparent onPress={() => this.showFilterModal()}>
			             <Icon name='ios-funnel' />
			         </Button>
		         </Right>
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
		          renderItem={({item}) =>
		            <View style = {styles.catalog}>
									<Image source={{uri: item.default_image.url}}
       						style={{width: 100, height: 100}} />
		              <Text > {item.title}</Text>
		              <Text >Price : {item.final_price.value}</Text>
		            </View>
		          }
		        />
		      </View>

		      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.filter_modal_visible}
          onRequestClose={() => {Toast.show({
              text: 'You are trying to close modal!',
              position: 'bottom',
              duration: 5000
            })}}
          >
          	<Header padder searchBar rounded>
          	<Left>
          	<Button transparent onPress={() => {Toast.show({
              text: 'You are trying to close modal!',
              position: 'bottom',
              buttonText: 'Close'
            })}}>
					             <Text>Toast with button</Text>
					         </Button>
					         </Left>
								<Right>
									<Button transparent onPress={() => this.setState({filter_modal_visible : false})}>
					             <Icon name='ios-close' />
					         </Button>
				         </Right>
	        	</Header>
		         <View style={{marginTop: 22}}>
		          <View>
		            <Text>Hello World!</Text>
		          </View>
		         </View>
        </Modal>

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
    marginBottom: 10,
    padding:10,
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
