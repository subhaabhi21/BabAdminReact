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
import { Col, Row, Grid } from 'react-native-easy-grid';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

class FacetOptions extends React.Component{
	constructor(props) {
		super(props);
		console.log("props: ",props)
		this.state = {
      		filter_modal_visible : false,
			    priceMinChoosen : this.props.priceMinChoosen,
			    priceMaxChoosen : this.props.priceMaxChoosen
		}
	}

  multiSliderValuesChange(values) {
		this.setState({
			priceMinChoosen: values[0],
      priceMaxChoosen: values[1]
		})
	}

	submitFilters() {
		this.closeFilterModal();
		this.props.setPriceRange([this.state.priceMinChoosen,this.state.priceMaxChoosen]);
	}

	closeFilterModal(){
		this.setState({
			filter_modal_visible: false
		})
	}

  showFilterModal(){
  	this.setState({
			filter_modal_visible: true
		})
  }

  clearPriceFilter() {
  	this.setState({
			priceMinChoosen : 10,
			priceMaxChoosen : 150
		},()=> this.props.setPriceRange([this.state.priceMinChoosen,this.state.priceMaxChoosen]));
		this.closeFilterModal();
  }

	render(){
		 return (
			 <View>
					<Button onPress={() => this.showFilterModal()}>
					    <Icon name='ios-funnel' />
					</Button>
					<Modal
		          animationType="slide"
		          transparent={false}
		          visible={this.state.filter_modal_visible}
		          onRequestClose={() => {
		          	this.closeFilterModal();
		          	Toast.show({
		              text: 'No change in filter!',
		              position: 'bottom',
		              duration: 5000
		            })}
		          }>
		         <View style={{marginTop: 20}}>
			         	<View style={styles.filterHeader}>
			         		<Text> Search Filter </Text>
										<Button onPress={() => this.closeFilterModal()}>
						             <Icon name='ios-close' />
						         </Button>
					     	</View>
			         	<View style={styles.filterContent}>
			            <Text>Choose Price Range</Text>
		              <MultiSlider
				            values={[this.state.priceMinChoosen, this.state.priceMaxChoosen]}
				            sliderLength={280}
				            onValuesChange={(values) => this.multiSliderValuesChange(values)}
				            min={10}
				            max={150}
				            step={1}
				            allowOverlap
				            snapped
				          />
				          <Text>Choosen Range - {this.state.priceMinChoosen} to {this.state.priceMaxChoosen}</Text>
				        </View>
			         	<View style={styles.filterFooter}>			        
		            		<Button onPress={() => this.clearPriceFilter()}>
						            <Text>CLEAR ALL</Text>
						        </Button>		           
		            		<Button onPress={() => this.submitFilters()}>
						            <Text>SHOW RESULTS</Text>
						        </Button>
						    </View>
							</View>
		      </Modal>
			</View>
    );
	}
}

const styles = StyleSheet.create({
  filterHeader:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between' 
  },
 filterContent:{
 		flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 70
 },
 filterFooter:{
 		flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    marginTop: 100
 }
})
module.exports = FacetOptions;
