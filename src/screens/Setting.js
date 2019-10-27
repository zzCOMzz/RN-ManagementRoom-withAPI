import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Setting extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Setting</Text>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            this.props.navigation.navigate('Auth');
          }}>
          <Text style={{fontSize: 25}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Setting;
