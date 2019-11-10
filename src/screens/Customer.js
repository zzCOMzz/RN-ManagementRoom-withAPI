import React from 'react';
import {
  View,
  Text,
  Alert,
  ToastAndroid,
  Image,
  TouchableOpacity,
  Vibration,
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
  getAdminId,
} from '../functions';

import {HostImage} from '../functions/Host';
import {connect} from 'react-redux';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
import ImagePicker from 'react-native-image-picker';

let staticImage = {
  uri: 'https://png.pngtree.com/svg/20170527/unknown_elephant_5068.png',
};
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
      image: staticImage,
    };
  }

  async componentDidMount() {
    const token = await getUserToken();
    const id = await getAdminId();
    await this.props.actionGetAllCustomer(token, id);
    await this.props.allMyCustomer.data;
  }

  showModal = () => {
    this.setState({isModalVisible: true});
  };

  handleAddCustomer = async () => {
    const token = await getUserToken();
    const id = await getAdminId();
    console.log('State Image ', this.state.image);

    const data = new FormData();
    data.append('customerName', this.state.name);
    data.append('customerID', this.state.identity);
    data.append('customerPhone', this.state.phoneNumber);
    data.append('photo', this.state.image);

    const res = await addCustomer(data);
    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllCustomer(token, id);
    this.setState({
      name: '',
      identity: '',
      phoneNumber: '',
      customerId: '',
      isModalVisible: false,
      image: staticImage,
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
    const id = await getAdminId();
    const data = new FormData();
    data.append('customerName', this.state.name);
    data.append('customerID', this.state.identity);
    data.append('customerPhone', this.state.phoneNumber);
    data.append('photo', this.state.image);

    const res = await updateCustomer(data, this.state.customerId);

    ToastAndroid.showWithGravity(
      `${res.data.message}`,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
    await this.props.actionGetAllCustomer(token, id);
    this.setState({
      isModalAddVisible: false,
      name: '',
      identity: '',
      phoneNumber: '',
      image: staticImage,
    });
  };

  handleDeleteCus = async (cusId, cusName) => {
    const token = await getUserToken();
    const id = await getAdminId();
    Alert.alert(
      `Delete Customer ${cusName} ?`,
      'Are You Sure Want to Delete this Customer',
      [
        {
          text: 'Cancel',
          onPress: () => {
            Alert.alert('Canceled', 'Deleted customer was cancel');
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deletCustomer(cusId);
            Alert.alert('Customer  was deleted');
            Vibration.vibrate(2000);
            await this.props.actionGetAllCustomer(token, id);
          },
        },
      ],
    );
  };

  handleAddPhoto = () => {
    const options = {
      title: 'Select Avatar',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const image = {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        };

        this.setState({
          image,
        });
      }
    });
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
      <View style={{flex: 1, backgroundColor: this.props.DarkMode.background}}>
        <ModalAddCustomer
          title="Update Customer"
          handleAddPhoto={() => this.handleAddPhoto()}
          image={this.state.image}
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
          handleAddPhoto={() => this.handleAddPhoto()}
          image={this.state.image}
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
        <Header titleText="Customer" />
        <ScrollView style={{marginVertical: 5}}>
          {this.props.allMyCustomer.data <= 0 ? (
            <View />
          ) : (
            this.props.allMyCustomer.data.data.map(item => {
              console.log('Item ', item);
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
                      borderRightWidth: 0,
                      borderLeftWidth: 0,
                      borderColor: 'dimgrey',
                      flexDirection: 'row',
                      padding: 10,
                      backgroundColor: this.props.DarkMode.isDarkmode
                        ? '#fff'
                        : this.props.DarkMode.background,
                    }}>
                    <Image
                      source={{
                        uri: `${HostImage}${item.photo}`,
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        margin: 10,
                        borderRadius: 20,
                      }}
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

        <Fab
          style={{
            backgroundColor: this.props.DarkMode.button,
            marginBottom: 50,
          }}
          position="bottomRight"
          active
          onPress={() => this.showModal()}>
          <Icon
            name="add"
            style={{color: this.props.DarkMode.isDarkmode ? 'white' : 'blue'}}
          />
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allMyCustomer: state.getAllCustomer,
    DarkMode: state.setDarkMode,
    isVibrate: state.setVibrate.isVibrate,
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
