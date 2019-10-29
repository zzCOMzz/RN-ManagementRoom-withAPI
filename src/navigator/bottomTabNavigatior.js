import React from 'react';

import {Icon} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

// ? import Screen
import CheckInScreen from '../screens/CheckIn';
import RoomScreen from '../screens/Room';
import CustomerScreen from '../screens/Customer';
import SettingScreen from '../screens/Setting';

import {ThemeColor} from '../Assets/constantColor';

const BottomTabStack = createMaterialBottomTabNavigator(
  {
    CheckIn: {
      screen: CheckInScreen,
      navigationOptions: {
        tabBarLabel: 'CheckIn',
        tabBarIcon: ({tintColor}) => (
          <Icon name="md-checkmark-circle" style={{color: tintColor}} />
        ),
      },
    },
    Room: {
      screen: RoomScreen,
      navigationOptions: {
        tabBarLabel: 'Room',
        tabBarIcon: ({tintColor}) => (
          <IconFA name="building" size={24} style={{color: tintColor}} />
        ),
      },
    },
    Customer: {
      screen: CustomerScreen,
      navigationOptions: {
        tabBarLabel: 'Customer',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-people" style={{color: tintColor}} />
        ),
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-settings" style={{color: tintColor}} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Room',
    activeColor: '#ccdeff',
    inactiveColor: '#9ec9ff',
    barStyle: {
      backgroundColor: `${ThemeColor}`,
    },
  },
);

export default BottomTabStack;
