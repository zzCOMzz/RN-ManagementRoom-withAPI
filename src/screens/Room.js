import React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';
import ModalAddNewRoom from '../components/modalRoom';
import {AddNewRoom, getUserToken, updateRoom, deleteRoom} from '../functions';

import {connect} from 'react-redux';
import {actionGetAllRoom} from '../redux/actions/actionRoom';

console.disableYellowBox = true;
class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisble: false,
      isModalAdd: false,
      inputRoomName: '',
      roomId: '',
    };
  }
  async componentDidMount() {
    const token = await getUserToken();
    if (!token) {
      Alert.alert('You Are Not Login', 'Please Login First', [
        {text: 'Login', onPress: () => this.props.navigation.navigate('Auth')},
      ]);
    }
    await this.props.actionGetAllRoom(token);
    await this.props.allRoom.data;
  }

  handleAddNewRoom = async () => {
    const response = await AddNewRoom(this.state.inputRoomName);
    ToastAndroid.showWithGravity(
      `${response.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    const token = await getUserToken();
    await this.props.actionGetAllRoom(token);
    this.setState({isModalAdd: false, inputRoomName: ''});
  };

  handleUpdateRoom = async (Id, roomName) => {
    this.setState({isModalVisble: true, inputRoomName: roomName, roomId: Id});
  };

  handleUpdateNewRoom = async () => {
    const token = await getUserToken();
    const res = await updateRoom(this.state.inputRoomName, this.state.roomId);
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllRoom(token);
    this.setState({isModalVisble: false, inputRoomName: ''});
  };

  handleDeleteRoom = async (roomId, orderId) => {
    const token = await getUserToken();
    const res = await deleteRoom(roomId, orderId);
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllRoom(token);
  };
  render() {
    return (
      <View>
        <ModalAddNewRoom
          title="Update Room"
          isVisible={this.state.isModalVisble}
          onCancel={() => this.setState({isModalVisble: false})}
          inputChangeValue={text => this.setState({inputRoomName: text})}
          inputValue={this.state.inputRoomName}
          onSubmit={() => this.handleUpdateNewRoom()}
        />
        <ModalAddNewRoom
          title="Add New Room"
          isVisible={this.state.isModalAdd}
          onCancel={() => this.setState({isModalAdd: false})}
          inputChangeValue={text => this.setState({inputRoomName: text})}
          inputValue={this.state.inputRoomName}
          onSubmit={() => this.handleAddNewRoom()}
        />
        <Header
          titleText="Room"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
        <ScrollView>
          <View style={{flexWrap: 'wrap-reverse', flexDirection: 'row'}}>
            {this.props.allRoom.data <= 0 ? (
              <View />
            ) : (
              this.props.allRoom.data.data.map(item => {
                return (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() =>
                      this.handleUpdateRoom(item._id, item.room_name)
                    }
                    onLongPress={() =>
                      this.handleDeleteRoom(item._id, item.order_id)
                    }>
                    <View
                      style={{
                        borderWidth: 4,
                        height: 80,
                        width: 80,
                        margin: 10,
                        paddingTop: 15,
                      }}>
                      <Text style={{alignSelf: 'center', fontSize: 30}}>
                        {item.room_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginBottom: 50,
            }}>
            <TouchableOpacity onPress={() => this.setState({isModalAdd: true})}>
              <View style={{borderWidth: 4, height: 80, width: 80, margin: 10}}>
                <Icon name="add" style={{fontSize: 50, alignSelf: 'center'}} />
                <Text style={{alignSelf: 'center'}}>ADD </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allRoom: state.getAllRoom,
  };
};
export default connect(
  mapStateToProps,
  {actionGetAllRoom},
)(Room);
