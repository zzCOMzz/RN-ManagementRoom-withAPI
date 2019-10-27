import React from 'react';
import {Spinner} from 'native-base';
import {View, Text} from 'react-native';
import {actionGetAllRoom} from '../redux/actions/actionRoom';
import {connect} from 'react-redux';
import {getUserToken} from '../functions';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const token = await getUserToken();
    await actionGetAllRoom(token);

    token != null
      ? this.props.navigation.navigate('App')
      : this.props.navigation.navigate('Auth');
  }
  render() {
    return (
      <View style={{alignItems: 'center', marginTop: '50%'}}>
        <Spinner size="large" color="blue" />
      </View>
    );
  }
}

const mapStateToProp = state => {
  return {...state};
};
export default connect(
  mapStateToProp,
  {actionGetAllRoom},
)(LoadingScreen);
