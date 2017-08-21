import React from 'react';
import { 
					AppRegistry,
					StyleSheet,
					Text,
					View,
					TextInput,
					TouchableOpacity,
					KeyboardAvoidingView,
					Button,
					Navigator,
			} from 'react-native';

class Home extends React.Component{

	render(){
		 return (
      <View style={styles.container}>
        <Text>Logged in successfully</Text>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

module.exports = Home;