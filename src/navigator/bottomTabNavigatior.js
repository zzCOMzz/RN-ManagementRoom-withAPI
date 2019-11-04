import React from 'react';

import {Icon} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

import {connect} from 'react-redux';

// ? import Screen
import CheckInScreen from '../screens/CheckIn';
import RoomScreen from '../screens/Room';
import CustomerScreen from '../screens/Customer';
import SettingScreen from '../screens/Setting';

import {ThemeColor} from '../Assets/constantColor';

const TabBarComponent = props => <BottomTabBar {...props} />;

const BottomTabStack = createBottomTabNavigator(
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
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-settings" style={{color: tintColor}} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Room',
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {},
    }),
    tabBarComponent: props => {
      // console.log('PROPS TABbAR', props);
      let changeMode;
      if (props.navigation.state.routes[3].params === undefined) {
        changeMode = '#3360ff';
      } else {
        changeMode = props.navigation.state.routes[3].params.bottom;
      }
      return (
        <TabBarComponent
          {...props}
          style={{
            backgroundColor: changeMode,
            color: 'white',
          }}
        />
      );
    },
  },
);

export default BottomTabStack;
