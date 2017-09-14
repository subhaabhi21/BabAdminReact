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

import MultiSlider from '@ptomasroos/react-native-multi-slider';


class FacetOptions extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
      		filter_modal_visible : false,
			    multiSliderValue: [10, 150],
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
		this.setState({filter_modal_visible : false});
		this.props.setPriceRange([this.state.priceMinChoosen,this.state.priceMaxChoosen]);
	}

  showFilterModal(){
  	this.setState({
			filter_modal_visible: true
		})
  }

	render() {
		return(
		 <View>
				<Button transparent onPress={() => this.showFilterModal()}>
				    <Icon name='ios-funnel' />
				</Button>

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
          	<Header style={styles.buttonBar}>
          			<Text> Search Filter </Text>
								<Right>
									<Button transparent onPress={() => this.setState({filter_modal_visible : false})}>
					             <Icon name='ios-close' />
					         </Button>
				        </Right>
	        	</Header>
		        <View style={{marginTop: 22 , marginRight: 10, marginLeft: 10}}>
		          <View>
		            <Text>Choose Price Range</Text>
	              <MultiSlider
			            values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
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
		          <View style={styles.buttonBar}>
			          <Button onPress={() => this.setState({filter_modal_visible : false})}>
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
 buttonBar : {
 	flex : 1,
 	flexDirection : row,
 	alignItems: 'center' 
 }
});

module.exports = FacetOptions;