import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ThemeColor} from '../Assets/constantColor';
import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
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
  Register: {
    screen: RegisterScreen,
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
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: 'History Customer',
        headerTitleStyle: {
          color: navigation.getParam('text'),
        },
        headerStyle: {
          backgroundColor: navigation.getParam('header'),
        },
      };
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
