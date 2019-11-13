import React from 'react';
import {View, Text, ScrollView, ToastAndroid, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {actionGetAllOrder} from '../redux/actions/actionOrder';
import {getUserToken, getAdminId, deleteOrderById} from '../functions';

class HistoryOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const token = await getUserToken();
    const id = await getAdminId();
    await this.props.getAllOrder(token, id);
  }

  deleteOrder = async id => {
    const {data} = await deleteOrderById(id);

    const token = await getUserToken();
    const idUser = await getAdminId();
    await this.props.getAllOrder(token, idUser);
    ToastAndroid.show(`${data.message}`, 3000);
  };
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            justifyContent: 'flex-end',
            backgroundColor: this.props.DarkMode.background,
          }}>
          <ScrollView>
            {this.props.allOrder.data <= 0 ? (
              <View>
                <Text>No Order History</Text>
              </View>
            ) : (
              this.props.allOrder.data.data.map(item => (
                <View
                  key={item._id}
                  style={{
                    borderWidth: 2,
                    backgroundColor: item.is_done ? '#1e90ff' : '#ff4d4d',
                    borderColor: item.is_done ? '#17c0eb' : '#ff3838',
                    borderRadius: 8,
                    flexDirection: 'row',
                    margin: 10,
                    padding: 10,
                  }}>
                  <View>
                    <Text style={{color: this.props.DarkMode.text}}>
                      Customer : {item.customer_id.name}
                    </Text>
                    <Text style={{color: this.props.DarkMode.text}}>
                      Room : {item.room_id.room_name}
                    </Text>
                    <Text style={{color: this.props.DarkMode.text}}>
                      End Order Time {item.order_end_time.slice(0, 10)}{' '}
                      {item.order_end_time.slice(11, 16)}
                    </Text>
                    <Text style={{color: this.props.DarkMode.text}}>
                      Duration : {item.duration} Minutes
                    </Text>
                  </View>
                  <View>
                    <Text style={{color: this.props.DarkMode.text}}>
                      Status :{' '}
                      {item.is_booked
                        ? 'ON BOOKED'
                        : item.is_done
                        ? 'RENT IS DONE'
                        : 'RENT NO COMPLETED'}
                    </Text>
                    {item.is_booked ? (
                      <View />
                    ) : (
                      <View style={{position: 'absolute', bottom: 0, right: 0}}>
                        <Icon
                          name="ios-trash"
                          style={{fontSize: 27, color: 'red'}}
                          onPress={() => this.deleteOrder(item._id)}
                        />
                      </View>
                    )}
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    allOrder: state.getAllOrder,
    DarkMode: state.setDarkMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrder: (token, id) => dispatch(actionGetAllOrder(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryOrder);
