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

// key pro Gjk4QBzHe7vgJj5ISpbDxu5xs1940ff2e28f-6bb3-4d5f-9eab-7ccbb2f2b200
// key stag IP08n3v5xCdOhQ5Qel997XMSH8df0ff2e28f-6bb3-4d5f-9eab-7ccbb2f2b200
