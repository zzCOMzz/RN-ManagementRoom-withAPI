import React from 'react';
import {Provider, connect} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';

import {store} from './src/redux/store';
import AppStackNavigator from './src/navigator/rootNavigator';
import codePush from 'react-native-code-push';

const AppNavigation = createReduxContainer(AppStackNavigator, 'root');
const mapStateToProps = state => ({
  state: state.router,
});
const AppWithNavigationState = connect(mapStateToProps)(AppNavigation);
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

App = codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
})(App);

export default App;
