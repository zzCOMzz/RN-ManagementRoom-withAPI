import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Keyboard,
  Dimensions,
  StyleSheet,
  Vibration,
  AsyncStorage,
} from 'react-native';
import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';
import moment from 'moment';

import {ModalAddNewOrder} from '../components/modalOrder';

import {connect} from 'react-redux';
import {getUserToken, addNewOrder, getAdminId} from '../functions';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
import {actionGetAllRoom} from '../redux/actions/actionRoom';
import {actionGetRoomById} from '../redux/actions/actionRoomById';
import {actionGetAllOrder} from '../redux/actions/actionOrder';
class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: false,
      duration: 0,
      roomName: '',
      roomId: '',
      selectedCustomerId: '',
      isLoading: false,
    };
  }
  async componentDidMount() {
    const token = await getUserToken();
    // const id = await getAdminId();
    const id = await AsyncStorage.getItem('admin-id');
    await this.props.dipatchCustomer(token, id);
    // await this.props.dispatchRoom(token, id);
    await this.props.dispatchAllOrder(token, id);
    await this.props.allRoom;
    await this.props.allCustomer;

    this.intervalTime = setInterval(async () => {
      await this.props.dispatchRoom(token, id);
      // this.timer();
      this.props.allRoom;
    }, 1000 * 30);
  }

  onClickRoom = (roomName, roomId) => {
    this.setState({modalIsVisible: true, roomName, roomId});
  };

  timer = time => {
    let timeLeft = moment(time).diff(moment(), 'seconds');
    if (timeLeft < 1) {
      if (this.props.isVibrate) {
        Vibration.vibrate([2000, 4000, 2000]);
      }
      return ' Rent Time Out';
    } else {
      return `${timeLeft} seconds left`;
    }
  };

  handleAddCheckIn = async () => {
    this.setState({isLoading: true});
    Keyboard.dismiss();
    const token = await getUserToken();
    const id = await getAdminId();
    if (this.state.duration !== 0 && this.state.selectedCustomerId !== '') {
      const res = await addNewOrder({
        roomId: this.state.roomId,
        customerId: this.state.selectedCustomerId,
        duration: this.state.duration,
        orderEnd: moment().add(this.state.duration, 'minutes'),
      });

      await this.props.dipatchCustomer(token, id);
      await this.props.dispatchRoom(token, id);

      ToastAndroid.showWithGravity(
        `${res.data.message}`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      this.setState({
        isLoading: false,
        modalIsVisible: false,
        roomId: '',
        duration: 0,
        selectedCustomerId: '',
      });
      this.setState({});
    } else {
      ToastAndroid.showWithGravity(
        'Please Complete the Form',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
    this.setState({});
  };

  handleToCheckOut = async (roomId, duration) => {
    const token = await getUserToken();
    const id = await getAdminId();
    await this.props.dispatchRoomById(token, roomId, id);
    this.props.navigation.navigate('CheckOut', {
      roomId,
      duration,
    });
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: this.props.DarkMode.background}}>
        <Header titleText="Check In" />
        <ModalAddNewOrder
          title="CheckIn"
          modalVisible={this.state.modalIsVisible}
          onCancel={() =>
            this.setState({
              modalIsVisible: false,
              selectedCustomerId: undefined,
            })
          }
          onSubmit={() => this.handleAddCheckIn()}
          dataCustomer={this.props.allCustomer}
          duration={duration => this.setState({duration})}
          roomName={this.state.roomName}
          isLoading={this.state.isLoading}
          onSelectCusomerId={id => this.setState({selectedCustomerId: id})}
        />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.props.allRoom.data <= 0 ? (
            <View />
          ) : (
            this.props.allRoom.data.data.map(item => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    item.is_booked
                      ? this.handleToCheckOut(
                          item._id,
                          this.timer(item.order_id.order_end_time),
                        )
                      : this.onClickRoom(item.room_name, item._id)
                  }>
                  <View
                    style={[
                      styles.containerRoom,
                      item.is_booked
                        ? {backgroundColor: 'gray', borderColor: '#2f3542'}
                        : {borderColor: '#009432', backgroundColor: '#4cd137'},
                    ]}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 30,
                        color: item.is_booked ? 'white' : '#dcdde1',
                      }}>
                      {item.room_name}
                    </Text>

                    <Text
                      style={[
                        styles.textRoom,
                        {color: item.is_booked ? 'white' : 'yellow'},
                      ]}>
                      {item.is_booked ? item.customer_id.name : 'Available'}
                    </Text>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      {!item.is_booked
                        ? ''
                        : item.order_id.order_end_time != null
                        ? this.timer(item.order_id.order_end_time)
                        : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allRoom: state.getAllRoom,
    allCustomer: state.getAllCustomer,
    allOrder: state.getAllOrder,
    DarkMode: state.setDarkMode,
    isVibrate: state.setVibrate.isVibrate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dipatchCustomer: (token, id) => dispatch(actionGetAllCustomer(token, id)),
    dispatchRoom: (token, id) => dispatch(actionGetAllRoom(token, id)),
    dispatchRoomById: (token, roomId, id) =>
      dispatch(actionGetRoomById(token, roomId, id)),
    dispatchAllOrder: (token, id) => dispatch(actionGetAllOrder(token, id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckIn);

const styles = StyleSheet.create({
  containerRoom: {
    borderWidth: 4,

    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderRadius: 7.5,
    height: Dimensions.get('screen').height / 7.5,
    width: Dimensions.get('screen').width / 2.25,
    margin: 10,
    paddingTop: 10,
  },
  textRoom: {
    fontSize: 16,

    alignSelf: 'center',
  },
});
