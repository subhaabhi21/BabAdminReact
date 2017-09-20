import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Api from '../app_common/common';
import HomeScreen from './home';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,Badge } from 'native-base'

class LoginScreen extends React.Component {

   static navigationOptions = {
    drawerLabel: 'Login',
    drawerIcon: ({ tintColor }) => (
     <Icon name='ios-clipboard'
      />
    ),
  };

  constructor() {
      console.log("inn constructor of Login")
    super();

    this.state = {
      login: {},
      domain: 'http://admin.amul.cc.buildabazaar.com',
      username: 'a@a.com',
      password: '123456',
      error : ''
    };
    this.authenticate = this._authenticate.bind(this);
  }


  _authenticate(){
      var domain = this.state.domain ? this.state.domain : ""
      var link = domain + '/api/v1/user_sessions/login.json?';
      var url = link.concat('customer%5Bemail%5D=',this.state.username,'&customer%5Bpassword%5D=',this.state.password);
      var fetch_type='POST';

      console.log("url: ",url)
      fetch(url,{method: fetch_type}).then((response) => response.json()).then((response) => {
        console.log("resp: ",response)
        if(response.status == 'success'){
          Api.setDomain(this.state.domain);
          Api.setHeaderToken(response.headers._token);
          this.props.navigation.navigate("Home")
          console.log("Logged in successfully");
        }
        else{
          if(response.error)
            this.setState({error : response.error[0]});
        }
      })
      .catch((error) => console.log("err: ",error))

  }

  render() {
    return (
      <Container>
       <Header>
         <Left>
           <Button transparent>
             <Icon name='menu'  onPress={() =>  this.props.navigation.navigate('DrawerOpen')}/>
           </Button>
         </Left>
         <Body>
           <Title>Header</Title>
         </Body>
         <Right />
       </Header>
       <Content>
         <KeyboardAvoidingView behavior='padding' style={styles.form}>
           <Text style ={{fontSize : 42, alignSelf : 'center', marginBottom : 20}}> Admin App </Text>
             <Text>Domain: </Text>
               <TextInput
               style={styles.input}
               defaultValue = {this.state.domain}
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
               defaultValue = {this.state.username}
               onChangeText={(usertext) => this.setState({username: usertext})}
           />
           <Text>Password: </Text>
           <TextInput
               placeholder='Password'
               secureTextEntry
               returnKeyType='go'
               style={styles.input}
               ref={(input) => this.passwordInput = input}
               defaultValue = {this.state.password}
               onChangeText={(usertext) => this.setState({password: usertext})}
           />
           <Button
               onPress={() => this.authenticate()}
               title='LOGIN'
               accessibilityLabel="Click to login"
           >
             <Text> Login </Text>
           </Button>
           {this.state.error.length > 0 &&
             <Badge danger style={{marginTop:20}}>
               <Text> {this.state.error} </Text>
             </Badge>
           }

         </KeyboardAvoidingView>
       </Content>
       <Footer>
         <FooterTab>
           <Button full>
             <Text>Footer</Text>
           </Button>
         </FooterTab>
       </Footer>
     </Container>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : '#fff',
  },
  form: {
    padding: 20,
    width : 350,
  },
  input: {
    height: 40,
    marginBottom: 20
  },

});

module.exports = LoginScreen;
