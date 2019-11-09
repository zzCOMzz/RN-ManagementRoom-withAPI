import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {connect} from 'react-redux';
import {actionGetAllOrder} from '../redux/actions/actionOrder';
import {getUserToken, getAdminId} from '../functions';

class HistoryOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const token = await getUserToken();
    const id = await getAdminId();
    await this.props.getAllOrder(token, id);
    console.log('ORDER ', this.props.allOrder.data);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          justifyContent: 'flex-end',
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
                  backgroundColor: item.is_done ? '#18dcff' : '#ff4d4d',
                  borderColor: item.is_done ? '#17c0eb' : '#ff3838',
                  borderRadius: 8,
                  flexDirection: 'row',
                  margin: 10,
                  padding: 10,
                }}>
                <View>
                  <Text>Customer : {item.customer_id.name}</Text>
                  <Text>Room : {item.room_id.room_name}</Text>
                  <Text>
                    End Order Time
                    {item.order_end_time.slice(0, 10)}{' '}
                    {item.order_end_time.slice(11, 16)}
                  </Text>
                  <Text>Duration : {item.duration} Minutes</Text>
                </View>
                <View>
                  <Text>
                    Status :{' '}
                    {item.is_booked
                      ? 'ON BOOKED'
                      : item.is_done
                      ? 'RENT IS DONE'
                      : 'RENT NO COMPLETED'}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allOrder: state.getAllOrder,
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
