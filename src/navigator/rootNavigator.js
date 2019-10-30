import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ThemeColor} from '../Assets/constantColor';
import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import BottomTabStack from './bottomTabNavigatior';
import CheckOutScreen from '../screens/CheckOut';
import HistoryOrderScreen from '../screens/HistoryOrder';
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
  CheckOut: {
    screen: CheckOutScreen,
    navigationOptions: {
      header: null,
    },
  },
  History: {
    screen: HistoryOrderScreen,
    navigationOptions: {
      headerTitle: 'History Customer',
      headerTitleStyle: {
        color: 'white',
      },
      headerStyle: {
        backgroundColor: ThemeColor,
      },
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
