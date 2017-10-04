import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AdminApp } from '../app_common/app_home';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AdminApp.router.getActionForPathAndParams('Home');
const tempNavState = AdminApp.router.getStateForAction(firstAction);
const secondAction = AdminApp.router.getActionForPathAndParams('Login');
const initialNavState = AdminApp.router.getStateForAction(
  secondAction,
  tempNavState
);

function nav(state = initialNavState, action) {
  let nextState;
  console.log(" in func nav state is ",state, " action is ", action)
  switch (action.type) {
    case 'Login':
      console.log("in case Login")
      nextState = AdminApp.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'Logout':
      console.log("in case Logout")
      nextState = AdminApp.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      console.log("in case default");
      nextState = AdminApp.router.getStateForAction(action, state);
      break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  console.log("next state: ",nextState)
  return nextState || state;
}

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;
