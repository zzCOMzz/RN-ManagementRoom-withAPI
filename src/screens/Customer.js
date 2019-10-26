import React from 'react';
import {View, Text, ToastAndroid, Image} from 'react-native';
import {Fab, Icon, Button} from 'native-base';
import Header from '../components/header';
import {ModalAddCustomer} from '../components/modalCustomer';
import {ThemeColor} from '../Assets/constantColor';

import {addCustomer, getUserToken} from '../functions';
import {connect} from 'react-redux';
import {actionGetAllCustomer} from '../redux/actions/actionCustomer';
class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      name: '',
      identity: '',
      phoneNumber: '',
    };
  }

  async componentDidMount() {
    const token = await getUserToken();
    await this.props.actionGetAllCustomer(token);
    await this.props.allMyCustomer.data;
    console.log('Customer ', this.props.allMyCustomer.data);
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
      isModalVisible: false,
      name: '',
      identity: '',
      phoneNumber: '',
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ModalAddCustomer
          name={this.state.name}
          changeName={text => this.setState({name: text})}
          identity={this.state.identity}
          changeIdentity={text => this.setState({identity: text})}
          phone={this.state.phoneNumber}
          changePhone={text => this.setState({phoneNumber: text})}
          modalVisible={this.state.isModalVisible}
          onCancel={() => this.setState({isModalVisible: false})}
          onSubmit={() => this.handleAddCustomer()}
        />
        <Header
          titleText="Customer"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
        {this.props.allMyCustomer.data <= 0 ? (
          <View />
        ) : (
          this.props.allMyCustomer.data.data.map(item => {
            return (
              <View
                key={item._id}
                style={{
                  borderWidth: 4,
                  flexDirection: 'row',
                  padding: 10,
                  margin: 10,
                }}>
                <Image
                  source={{
                    uri:
                      'https://png.pngtree.com/svg/20170527/unknown_elephant_5068.png',
                  }}
                  style={{width: 50, height: 50}}
                />
                <View style={{marginLeft: 10}}>
                  <View>
                    <Text>Name : {item.name}</Text>
                  </View>
                  <View>
                    <Text>Identity Number : {item.identity_number}</Text>
                  </View>
                  <View>
                    <Text>Phone Number : +{item.phone_number}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
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
