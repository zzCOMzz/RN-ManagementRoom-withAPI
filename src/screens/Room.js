import React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Icon, Fab} from 'native-base';
import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';
import ModalAddNewRoom from '../components/modalRoom';
import {
  AddNewRoom,
  getUserToken,
  updateRoom,
  deleteRoom,
  deleteRoomWithOrder,
  getAdminId,
} from '../functions';

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
    const id = await getAdminId();
    const token = await getUserToken();
    if (!token) {
      Alert.alert('You Are Not Login', 'Please Login First', [
        {text: 'Login', onPress: () => this.props.navigation.navigate('Auth')},
      ]);
    }
    await this.props.actionGetAllRoom(token, id);
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
    const id = await getAdminId();
    await this.props.actionGetAllRoom(token, id);
    this.setState({isModalAdd: false, inputRoomName: ''});
  };

  handleUpdateRoom = async (Id, roomName) => {
    this.setState({isModalVisble: true, inputRoomName: roomName, roomId: Id});
  };

  handleUpdateNewRoom = async () => {
    const token = await getUserToken();
    const id = await getAdminId();
    const res = await updateRoom(this.state.inputRoomName, this.state.roomId);
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllRoom(token, id);
    this.setState({isModalVisble: false, inputRoomName: ''});
  };

  handleDeleteRoom = async (roomId, orderId) => {
    const token = await getUserToken();
    const id = await getAdminId();
    const res = await deleteRoom(roomId);

    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllRoom(token, id);
  };

  handleDeleteRoomWithOrder = async (roomId, orderId) => {
    const token = await getUserToken();
    const id = await getAdminId();
    const res = await deleteRoomWithOrder(roomId, orderId);

    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllRoom(token, id);
  };

  handleErr = () => {
    ToastAndroid.showWithGravity(
      'Cannot be Deleted, The Room still in Order',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  handleActionRoom = item => {
    item.is_booked
      ? this.handleErr()
      : item.order_id == undefined
      ? this.handleDeleteRoom(item._id)
      : this.handleDeleteRoomWithOrder(item._id, item.order_id._id);
  };
  render() {
    return (
      <View style={{flex: 1}}>
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
        <StatusBar
          backgroundColor={ThemeColor}
          animated
          barStyle="light-content"
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
                    onLongPress={() => this.handleActionRoom(item)}>
                    <View style={Styles.containerRoom}>
                      <Text style={Styles.textRoomName}>{item.room_name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>

        <Fab
          position="bottomRight"
          style={{backgroundColor: '#3498db'}}
          onPress={() => this.setState({isModalAdd: true})}>
          <Icon name="add" />
        </Fab>
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

const Styles = StyleSheet.create({
  btnAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 50,
  },
  containerBtnAdd: {borderWidth: 4, height: 80, width: 80, margin: 10},
  iconAdd: {fontSize: 50, alignSelf: 'center'},
  textRoomName: {alignSelf: 'center', fontSize: 30},
  containerRoom: {
    borderWidth: 4,
    borderRadius: 12,
    height: 80,
    width: 80,
    margin: 10,
    paddingTop: 15,
  },
});
