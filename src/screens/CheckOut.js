import React from 'react';
import {View, Text, ToastAndroid, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import {Form, Item, Input, Label} from 'native-base';

import {actionGetAllRoom} from '../redux/actions/actionRoom';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
import {actionGetRoomById} from '../redux/actions/actionRoomById';
import {connect} from 'react-redux';
import {getUserToken, checkoutOrder} from '../functions';

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
    const token = await getUserToken();
    this.props.actionGetRoomById(token, this.state.roomId);
  }

  handleCheckOut = async () => {
    const token = await getUserToken();
    const res = await checkoutOrder(
      {roomId: this.state.roomId},
      this.state.orderId,
    );
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetRoom(token);
    this.props.navigation.navigate('CheckIn');
  };

  render() {
    return (
      <View>
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
          <Item stackedLabel>
            <Label>
              <Text>Duration Left (minutes)</Text>
            </Label>
            <Input value={this.state.duration} disabled />
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
    actionGetRoom: token => dispatch(actionGetAllRoom(token)),
    actionGetCustomer: token => dispatch(actionGetAllCustomer(token)),
    actionGetRoomById: (token, roomId) =>
      dispatch(actionGetRoomById(token, roomId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckOut);
