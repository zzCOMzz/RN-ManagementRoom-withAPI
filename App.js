import React from 'react';
import {Provider, connect} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';

import {store} from './src/redux/store';
import AppStackNavigator from './src/navigator/rootNavigator';

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

export default App;
