import React from 'react';
import {View, Text} from 'react-native';

import {ModalAddCustomer} from '../components/modalCustomer';

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  render() {
    return (
      <View>
        <ModalAddCustomer modalVisible={this.state.modalVisible} />
        <Text>CheckIn</Text>
      </View>
    );
  }
}

export default CheckIn;
