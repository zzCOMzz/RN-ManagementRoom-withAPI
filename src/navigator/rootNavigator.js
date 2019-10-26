import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/Login';
import BottomTabStack from './bottomTabNavigatior';

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppStackNavigator = createStackNavigator({
  BottomTab: {
    screen: BottomTabStack,
    navigationOptions: {
      header: null,
    },
  },
});
const AppStack = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStackNavigator,
  },
  {
    initialRouteName: 'App',
  },
);

export default createAppContainer(AppStack);
