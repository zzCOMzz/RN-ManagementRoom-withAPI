import React from 'react';
import {View, Text, Alert, TouchableOpacity, ToastAndroid} from 'react-native';
import {Icon} from 'native-base';
import Header from '../components/header';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeColor} from '../Assets/constantColor';
import ModalAddNewRoom from '../components/modalRoom';
import axios from 'axios';
import {Host} from '../functions/Host';
import {AddNewRoom, getUserToken} from '../functions';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisble: false,
      inputRoomName: '',
    };
  }
  async componentDidMount() {
    const token = await getUserToken();
    if (!token) {
      Alert.alert('You Are Not Login', 'Please Login First', [
        {text: 'Login', onPress: () => this.props.navigation.navigate('Auth')},
      ]);
    }
  }

  handleAddNewRoom = async () => {
    this.setState({isModalVisble: false});
    const response = await AddNewRoom(this.state.inputRoomName);
    ToastAndroid.showWithGravity(
      `${response.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  render() {
    return (
      <View>
        <ModalAddNewRoom
          isVisible={this.state.isModalVisble}
          onCancel={() => this.setState({isModalVisble: false})}
          inputChangeValue={text => this.setState({inputRoomName: text})}
          inputValue={this.state.inputRoomName}
          onSubmit={() => this.handleAddNewRoom()}
        />
        <Header
          titleText="Room"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.setState({isModalVisble: true})}>
            <View style={{borderWidth: 4, height: 80, width: 80, margin: 10}}>
              <Icon name="add" style={{fontSize: 50, alignSelf: 'center'}} />
              <Text style={{alignSelf: 'center'}}>ADD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Room;
