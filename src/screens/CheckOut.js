import React from 'react';
import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Header from '../components/header';
import {Form, Item, Input, Label} from 'native-base';

import {actionGetAllRoom} from '../redux/actions/actionRoom';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
import {actionGetRoomById} from '../redux/actions/actionRoomById';
import {connect} from 'react-redux';
import {getUserToken, checkoutOrder, getAdminId} from '../functions';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: this.props.navigation.getParam('roomId'),
      duration: this.props.getRoomId.data.data.order_id.duration,
      customerName: this.props.getRoomId.data.data.customer_id.name,
      roomName: this.props.getRoomId.data.data.room_name,
      orderId: this.props.getRoomId.data.data.order_id._id,
    };
  }

  async componentDidMount() {
    const id = await getAdminId();
    const token = await getUserToken();
    this.props.actionGetRoomById(token, this.state.roomId, id);
  }

  // startTimer = () => {
  //   this.clockCall = setInterval(() => {
  //     this.decrementClock();
  //   }, 1000 * 60);
  // };

  // decrementClock = () => {
  //   if (this.state.duration === 0) {
  //     clearInterval(this.clockCall);
  //   }
  //   this.setState(
  //     prevState => ({duration: prevState.duration - 1}),
  //     () => {
  //       if (this.state.duration === 0) {
  //         clearInterval(this.clockCall);
  //       }
  //     },
  //   );
  // };
  // componentWillUnmount() {
  //   clearInterval(this.clockCall);
  // }

  handleCheckOut = async () => {
    const token = await getUserToken();
    const id = await getAdminId();
    const res = await checkoutOrder(
      {roomId: this.state.roomId},
      this.state.orderId,
      id,
    );
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetRoom(token, id);
    await this.props.actionGetCustomer(token, id);
    this.props.navigation.navigate('CheckIn');
  };

  render() {
    console.log('DURATION', this.state.duration);

    return (
      <View>
        <StatusBar hidden />
        <Header
          titleText="Check Out"
          stylesHeader={{backgroundColor: '#4cd137', height: 50}}
        />
        <Form style={{marginTop: 50}}>
          <Item stackedLabel>
            <Label>
              <Text>Room Name</Text>
            </Label>
            <Input value={this.state.roomName} disabled />
          </Item>
          <Item stackedLabel>
            <Label>
              <Text>Customer</Text>
            </Label>
            <Input value={this.state.customerName} disabled />
          </Item>
          <Item style={{marginTop: 20}}>
            <Label>
              <Text>Duration Left (minutes) : </Text>{' '}
              <Text>{this.state.duration}</Text>
            </Label>
          </Item>
        </Form>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 90,
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('CheckIn')}>
            <Text style={{fontSize: 22}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleCheckOut()}>
            <Text style={{fontSize: 22}}>CheckOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    getRoom: state.getAllRoom,
    getRoomId: state.getRoomById,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionGetRoom: (token, id) => dispatch(actionGetAllRoom(token, id)),
    actionGetCustomer: (token, id) => dispatch(actionGetAllCustomer(token, id)),
    actionGetRoomById: (token, roomId, id) =>
      dispatch(actionGetRoomById(token, roomId, id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOut);
