import React from 'react';
import {View, Text, AsyncStorage, Alert} from 'react-native';

class Room extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('You Are Not Login', 'Please Login First', [
        {text: 'Login', onPress: () => this.props.navigation.navigate('Auth')},
      ]);
    }
  }
  render() {
    return (
      <View>
        <Text>Room</Text>
      </View>
    );
  }
}

export default Room;
