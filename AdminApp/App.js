import React from 'react';
import {
          AppRegistry,
          StyleSheet,
          View,
          ActivityIndicator,
       } from 'react-native';
import { Text,Button} from 'native-base';
import {
 StackNavigator,
 DrawerNavigator,
} from 'react-navigation';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './components/redux_try/reducers';
import AppWithNavigationState from './components/redux_try/AppNavigator';

export default class App extends React.Component {
  store = createStore(AppReducer);
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
// import React from 'react'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
// import App from './components/redux_todo/components/App'
// import reducer from './components/redux_todo/reducers'
// export default class TodoApp extends React.Component {
//   store = createStore(reducer);
//   render() {
//     console.log("in todoapp")
//     return (
//       <Provider store={this.store}>
//         <App />
//       </Provider>
//     );
//   }
// }
