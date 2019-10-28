import React from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';

import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';

import {ModalAddNewOrder} from '../components/modalOrder';

import {connect} from 'react-redux';
import {getUserToken, addNewOrder} from '../functions';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
import {actionGetAllRoom} from '../redux/actions/actionRoom';

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsVisible: false,
      duration: 0,
      roomName: '',
      roomId: '',
      selectedCustomerId: '',
    };
  }
  async componentDidMount() {
    const token = await getUserToken();
    await this.props.dipatchCustomer(token);
    await this.props.dispatchRoom(token);
    await this.props.allRoom;
    await this.props.allCustomer;
  }

  onClickRoom = (roomName, roomId) => {
    this.setState({modalIsVisible: true, roomName, roomId});
  };

  handleAddCheckIn = async () => {
    const token = await getUserToken();
    if (this.state.duration !== 0 && this.state.selectedCustomerId !== '') {
      const res = await addNewOrder({
        roomId: this.state.roomId,
        customerId: this.state.selectedCustomerId,
        duration: this.state.duration,
      });
      await this.props.dipatchCustomer(token);
      await this.props.dispatchRoom(token);
      ToastAndroid.showWithGravity(
        `${res.data.message}`,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      this.setState({
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
  render() {
    return (
      <View>
        <Header
          titleText="Check In"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
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
                  onPress={() => this.onClickRoom(item.room_name, item._id)}>
                  <View
                    style={{
                      borderWidth: 4,
                      height: 110,
                      width: 115,
                      margin: 10,
                      paddingTop: 30,
                      backgroundColor: item.is_booked ? '#4cd137' : 'gray',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 30,
                        color: item.is_booked ? '#dcdde1' : 'white',
                      }}>
                      {item.room_name}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dipatchCustomer: token => dispatch(actionGetAllCustomer(token)),
    dispatchRoom: token => dispatch(actionGetAllRoom(token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckIn);
