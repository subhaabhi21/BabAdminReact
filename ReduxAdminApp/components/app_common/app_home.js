import React from 'react';
import {
          AppRegistry,
          StyleSheet,
          View,
          ActivityIndicator,
       } from 'react-native';

import {
 StackNavigator,
 DrawerNavigator,
 addNavigationHelpers,
} from 'react-navigation';
import LoginScreen from '../Login/login';
import HomeScreen from '../Login/home';
import PurchasesScreen from '../Purchase/purchases';
import SearchScreen from '../Search/search';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const AdminApp = DrawerNavigator({
  Search : {screen : SearchScreen},
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  Purchases: { screen: PurchasesScreen }
  },{
    mode : 'card',
    headerMode : 'float'
  }
);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AdminApp navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isReady: false
//     };
//   }
//
//   async componentWillMount() {
//     await Expo.Font.loadAsync({
//       Roboto: require("native-base/Fonts/Roboto.ttf"),
//       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//       Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
//     });
//     this.setState({ isReady: true });
//   }
//
//   render() {
//     if (!this.state.isReady) {
//       return (
//         <View style={{flex: 1, justifyContent: 'center'}}>
//           <ActivityIndicator />
//         </View>
//       );
//     }
//
//     return (
//         <AdminApp />
//    )
//   }
// }
