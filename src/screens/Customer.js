import React from 'react';
import {
  View,
  Text,
  Alert,
  ToastAndroid,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Fab, Icon, Right} from 'native-base';
import Header from '../components/header';
import {ModalAddCustomer} from '../components/modalCustomer';
import {ThemeColor} from '../Assets/constantColor';
import Swipeable from 'react-native-swipeable';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {
  addCustomer,
  getUserToken,
  updateCustomer,
  deletCustomer,
} from '../functions';
import {connect} from 'react-redux';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isModalAddVisible: false,
      name: '',
      identity: '',
      phoneNumber: '',
      customerId: '',
    };
  }

  async componentDidMount() {
    const token = await getUserToken();
    await this.props.actionGetAllCustomer(token);
    await this.props.allMyCustomer.data;
  }

  showModal = () => {
    this.setState({isModalVisible: true});
  };

  handleAddCustomer = async () => {
    const token = await getUserToken();
    const res = await addCustomer({
      customerName: this.state.name,
      customerID: this.state.identity,
      customerPhone: this.state.phoneNumber,
    });
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllCustomer(token);
    this.setState({
      name: '',
      identity: '',
      phoneNumber: '',
      customerId: '',
      isModalVisible: false,
    });
  };

  handleGetData = ({name, _id, identity_number, phone_number}) => {
    this.setState({
      isModalAddVisible: true,
      name,
      identity: identity_number,
      phoneNumber: phone_number.toString(),
      customerId: _id,
    });
  };

  handleUpdateCustomer = async () => {
    const token = await getUserToken();
    const res = await updateCustomer(
      {
        customerName: this.state.name,
        customerId: this.state.identity,
        customerPhone: this.state.phoneNumber,
      },
      this.state.customerId,
    );

    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllCustomer(token);
    this.setState({
      isModalAddVisible: false,
      name: '',
      identity: '',
      phoneNumber: '',
    });
  };

  handleDeleteCus = async (cusId, cusName) => {
    const token = await getUserToken();
    Alert.alert(
      `Delete Customer ${cusName}`,
      'Are You Sure Want to Delete this Customer',
      [
        {
          text: 'Cancel',
          onPress: () => {
            alert('deleted was canceled');
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deletCustomer(cusId);
            alert('Customer  was deleted');
            await this.props.actionGetAllCustomer(token);
          },
        },
      ],
    );
  };

  handleErr = () => {
    ToastAndroid.showWithGravity(
      'This User Still Using Our Room',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  handleDeletCustomer = item => {
    item.is_order_in_room == undefined
      ? this.handleDeleteCus(item._id, item.name)
      : item.is_order_in_room.is_booked
      ? this.handleErr()
      : this.handleDeleteCus(item._id, item.name);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <ModalAddCustomer
          title="Update Customer"
          name={this.state.name}
          changeName={text => this.setState({name: text})}
          identity={this.state.identity}
          changeIdentity={text => this.setState({identity: text})}
          phone={this.state.phoneNumber}
          changePhone={text => this.setState({phoneNumber: text})}
          modalVisible={this.state.isModalAddVisible}
          onCancel={() =>
            this.setState({
              isModalAddVisible: false,
              name: '',
              identity: '',
              phoneNumber: '',
              customerId: '',
            })
          }
          onSubmit={() => this.handleUpdateCustomer()}
        />
        <ModalAddCustomer
          title="Add Customer"
          name={this.state.name}
          changeName={text => this.setState({name: text})}
          identity={this.state.identity}
          changeIdentity={text => this.setState({identity: text})}
          phone={this.state.phoneNumber}
          changePhone={text => this.setState({phoneNumber: text})}
          modalVisible={this.state.isModalVisible}
          onCancel={() =>
            this.setState({
              isModalVisible: false,
              name: '',
              identity: '',
              phoneNumber: '',
              customerId: '',
            })
          }
          onSubmit={() => this.handleAddCustomer()}
        />
        <Header
          titleText="Customer"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
        <ScrollView style={{marginVertical: 5}}>
          {this.props.allMyCustomer.data <= 0 ? (
            <View />
          ) : (
            this.props.allMyCustomer.data.data.map(item => {
              return (
                <Swipeable
                  key={item._id}
                  rightButtons={[
                    <EditComponent
                      handleEditItem={() => this.handleGetData(item)}
                    />,
                    <DeleteComponent
                      handleDeleteItem={() => this.handleDeletCustomer(item)}
                    />,
                  ]}>
                  <View
                    style={{
                      borderWidth: 2,

                      borderColor: 'dimgrey',
                      flexDirection: 'row',
                      padding: 10,
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://png.pngtree.com/svg/20170527/unknown_elephant_5068.png',
                      }}
                      style={{width: 60, height: 60, margin: 10}}
                    />
                    <View style={{marginLeft: 10}}>
                      <View>
                        <Text>Name : {item.name}</Text>
                        <Text>Identity Number : {item.identity_number}</Text>
                        <Text>
                          Phone Number : +{item.phone_number.toString()}
                        </Text>
                      </View>
                      {item.is_order_in_room != undefined ? (
                        item.is_order_in_room.is_booked ? (
                          <View>
                            <Text>
                              Order at Room {item.is_order_in_room.room_name}
                            </Text>
                          </View>
                        ) : (
                          <View />
                        )
                      ) : (
                        <View />
                      )}
                    </View>
                    <Right>
                      <IconFA name="arrow-left" size={22} />
                    </Right>
                  </View>
                </Swipeable>
              );
            })
          )}
        </ScrollView>

        <Fab position="bottomRight" active onPress={() => this.showModal()}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allMyCustomer: state.getAllCustomer,
  };
};

export default connect(
  mapStateToProps,
  {actionGetAllCustomer},
)(Customer);

const EditComponent = props => {
  return (
    <TouchableOpacity
      onPress={() => props.handleEditItem()}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: '#3ae374',
        height: '100%',
      }}>
      <IconFA name="edit" size={35} color="#ecf0f1" />
    </TouchableOpacity>
  );
};

const DeleteComponent = props => {
  return (
    <TouchableOpacity
      onPress={() => props.handleDeleteItem()}
      style={{
        backgroundColor: '#ff3838',
        padding: 30,
        height: '100%',
      }}>
      <IconFA name="trash" color="#ecf0f1" size={35} />
    </TouchableOpacity>
  );
};
