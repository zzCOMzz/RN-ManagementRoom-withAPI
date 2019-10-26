import React from 'react';

import AppStackNavigator from './src/navigator/rootNavigator';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <AppStackNavigator />;
  }
}

export default App;
