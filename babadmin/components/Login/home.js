import React from 'react';
import { 
					AppRegistry,
					StyleSheet,
					Text,
					View,
					Button,
					Image
			} from 'react-native';

class Home extends React.Component{

	render(){
		 return (
      <View style={styles.container}>
        <Image
          style={styles.home_image}
          source={{uri: 'http://indianonlineseller.com/wp-content/uploads/2013/12/buildabazzar.png'}}
        />
        <Button 
            style={styles.buttonLink} 
            onPress={() => this.props.navigation.navigate('Purchases')} 
            title='PURCHASES'
            accessibilityLabel="Purchases"
        />
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
  home_image: {
  	width: 350,
  	height: 200,
  	resizeMode: 'contain'
  },
  buttonLink: {
    backgroundColor: '#4286f4',
    paddingVertical: 15,
    textAlign: 'center',
    color: '#ffffff'
  },
});

module.exports = Home;