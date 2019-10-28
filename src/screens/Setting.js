import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';
import AsyncStorage from '@react-native-community/async-storage';
class Setting extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Header
          titleText="Setting"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
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
