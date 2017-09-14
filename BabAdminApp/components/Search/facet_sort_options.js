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
		         <Grid>
		         		<Row><Col><Text> Search Filter </Text></Col>
								<Col>
									<Button onPress={() => this.closeFilterModal()}>
					             <Icon name='ios-close' />
					         </Button>
				        </Col>
				        </Row>
		            <Row><Text>Choose Price Range</Text></Row>
	              <Row><MultiSlider
			            values={[this.state.priceMinChoosen, this.state.priceMaxChoosen]}
			            sliderLength={280}
			            onValuesChange={(values) => this.multiSliderValuesChange(values)}
			            min={10}
			            max={150}
			            step={1}
			            allowOverlap
			            snapped
			          /></Row>
			          <Row><Text>Choosen Range - {this.state.priceMinChoosen} to {this.state.priceMaxChoosen}</Text></Row>
			          <Row><Grid>
			            <Col>
			            		<Button onPress={() => this.clearPriceFilter()}>
							            <Text>CLEAR ALL</Text>
							        </Button>
			            </Col>
			            <Col>
			            		<Button onPress={() => this.submitFilters()}>
							            <Text>SHOW RESULTS</Text>
							        </Button>
			            </Col>
			          </Grid></Row>
		        </Grid>
		      </Modal>
			</View>
    );
	}
}

const styles = StyleSheet.create({
 buttonBar:{
    flex:1,
    flexDirection: 'row',
    alignItems : 'center',
  }
})
module.exports = FacetOptions;
