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
        } from 'react-native';
import api from '../app_common/common';
import Home from './home';

class Login extends React.Component {

  constructor() {
    super();
  
    this.state = {
      login: {},
      domain: 'http://admin.amul.cc.buildabazaar.com',
      username: 'a@a.com',
      password: '123456'
    };
    this._authenticate = this._authenticate.bind(this);
  }

  _authenticate(){

      var domain = this.state.domain;
      var link = '/api/v1/user_sessions/login.json?';
      var url = domain.concat(link,'customer%5Bemail%5D=',this.state.username,'&customer%5Bpassword%5D=',this.state.password);
      var fetch_type='POST';

      fetch(url,{method: fetch_type}).then((response) => response.json()).then((response) => {
        this.setState({
          login: response
        })
        console.log("login resp; ",this.state.login)
        api.setHeaderToken(this.state.login.headers._token);
        api.setDomain(this.state.domain);

        console.log("doamin set to: ",api.getDomain())
        this.props.navigation.navigate('Home');
      }).catch((error) => {
        console.error(error);
      });
      
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.app_title}>ADMIN APP</Text>
        <Text>Domain: </Text>
        <TextInput 
            style={styles.input}
            value={this.state.domain}
            onChangeText={(usertext) => this.setState({domain: usertext})}
        />
        <Text>Username: </Text>
        <TextInput 
            placeholder='Email' 
            style={styles.input}
            returnKeyType='next'
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCapitalize='none'
            autoCorrect={false}
            value={this.state.username}
            onChangeText={(usertext) => this.setState({username: usertext})}
        />
        <Text>Password: </Text>
        <TextInput 
            placeholder='Password' 
            secureTextEntry 
            returnKeyType='go'
            style={styles.input}
            value={this.state.password}
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
    padding: 20,
    height: 500,
    width: 340
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
  },
  app_title: {
    fontSize: 20,
    textAlign: 'center',
  }
});

module.exports = Login;