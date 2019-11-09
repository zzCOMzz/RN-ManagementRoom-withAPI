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
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => {
          return <Icon name="ios-settings" style={{color: tintColor}} />;
        },
      }),
    },
  },
  {
    initialRouteName: 'Room',
    tabBarOptions: {
      activeTintColor: '#57606f',
      inactiveTintColor: '#95a5a6',
    },
    lazy: true,
    tabBarComponent: props => {
      let changeMode;
      if (props.navigation.state.routes[3].params === undefined) {
        changeMode = '#fff';
      } else {
        changeMode = props.navigation.state.routes[3].params.bottom;
      }
      return (
        <TabBarComponent
          {...props}
          style={{
            backgroundColor: changeMode,
            color: 'white',
            borderStartWidth: 2,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderEndWidth: 2,
            borderStartColor: '#bdc3c7',
            borderEndColor: '#bdc3c7',
            borderTopColor: '#bdc3c7',
            borderBottomColor: '#bdc3c7',
            borderRadius: 30,
            position: 'absolute',
            bottom: 5,
            marginHorizontal: 10,
            left: 0,
            width: '100%',
            height: 55,
          }}
        />
      );
    },
  },
);

export default BottomTabStack;
