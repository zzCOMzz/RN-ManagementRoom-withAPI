import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from '../screens/Loading';
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

const LoadingStack = createStackNavigator({
  Loading: {
    screen: LoadingScreen,
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
    Loading: LoadingStack,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default createAppContainer(AppStack);
