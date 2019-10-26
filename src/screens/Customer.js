import React from 'react';
import {View, Text, ToastAndroid} from 'react-native';
import {Fab, Icon, Button} from 'native-base';
import Header from '../components/header';
import {ModalAddCustomer} from '../components/modalCustomer';
import {ThemeColor} from '../Assets/constantColor';

import {addCustomer} from '../functions';
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
  showModal = () => {
    this.setState({isModalVisible: true});
  };

  handleAddCustomer = async () => {
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
    this.setState({isModalVisible: false});
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

        <Fab position="bottomRight" active onPress={() => this.showModal()}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

export default Customer;
