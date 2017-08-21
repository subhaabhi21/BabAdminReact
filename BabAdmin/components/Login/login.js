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
import api from '../app_common/common';
import Home from './home';

class Login extends React.Component {

  constructor() {
      console.log("inn constructor of Login")
    super();
  
    this.state = {
      login: {},
      domain: '',
      username: '',
      password: ''
    };
    this._authenticate = this._authenticate.bind(this);
  }

  _authenticate(){
      var link = 'http://admin.amul.cc.buildabazaar.com/api/v1/user_sessions/login.json?';
      var url = link.concat('customer%5Bemail%5D=',this.state.username,'&customer%5Bpassword%5D=',this.state.password);
      var fetch_type='POST';

      api.authenticate(url,fetch_type).then((response) => {
        this.setState({
          login: response
        })
        
        // this.props.navigator.push({
        //   name: 'Home',
        // })

        console.log("JSON response : ",JSON.stringify(this.state.login, null, 4))
      })
      
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text>Domain: </Text>
        <TextInput 
            style={styles.input}
            onChangeText={(usertext) => this.setState({domain: usertext})}
        />
        <Text>Username: </Text>
        <TextInput 
            placeholder='Email' 
            placeholderTextColor='#4286f4' 
            style={styles.input}
            returnKeyType='next'
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(usertext) => this.setState({username: usertext})}
        />
        <Text>Password: </Text>
        <TextInput 
            placeholder='Password' 
            secureTextEntry 
            returnKeyType='go'
            style={styles.input}
            ref={(input) => this.passwordInput = input}
            onChangeText={(usertext) => this.setState({password: usertext})}
        />
        <Button 
            style={[styles.buttonContainer,styles.buttonText]} 
            onPress={this._authenticate} 
            title='LOGIN'
            accessibilityLabel="Click to login"
        />

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 1000,
    width: 350
  },
  input: {
    height: 40,
    marginBottom: 20
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

module.exports = Login;