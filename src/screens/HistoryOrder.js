import React from 'react';
import {View, Text} from 'react-native';

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
      <View>
        <Text>helo</Text>
        {this.props.allOrder.data <= 0 ? (
          <View>
            <Text>helo3</Text>
          </View>
        ) : (
          this.props.allOrder.data.data.map(item => {
            <View>
              <Text>{item.room_id.room_name}</Text>
              <Text>helo2</Text>
            </View>;
          })
        )}
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
    getAllOrder: token => dispatch(actionGetAllOrder(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryOrder);
