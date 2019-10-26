import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Input, Item, Label, Icon, Form} from 'native-base';

import Modal from 'react-native-modal';

class ModalAddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
    };
  }
  render() {
    return (
      <KeyboardAvoidingView>
        <Modal
          animationIn="bounceInUp"
          animationInTiming={1500}
          animationOut="bounceOut"
          animationOutTiming={1000}
          isVisible={this.state.modalVisible}
          style={{
            marginHorizontal: 40,
            marginVertical: 20,
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{fontSize: 30, alignSelf: 'center', fontWeight: 'bold'}}>
              Add Customer
            </Text>
            <Form
              style={{
                paddingHorizontal: '4%',
                paddingLeft: 0,
              }}>
              <Item stackedLabel style={{marginVertical: '6%'}}>
                <Label>
                  <Text>Name*</Text>
                </Label>
                <Input />
              </Item>
              <Item stackedLabel style={{marginVertical: '6%'}}>
                <Label>
                  <Text>Identity Number*</Text>
                </Label>
                <Input />
              </Item>
              <Item stackedLabel style={{marginVertical: '6%'}}>
                <Label>
                  <Text>Phone Number*</Text>
                </Label>
                <Input />
              </Item>
              <View style={{marginHorizontal: 10, marginTop: 20}}>
                <Text>Photo (Optional)</Text>
                <Icon name="ios-camera" style={{fontSize: 60, color: 'blue'}} />
              </View>
            </Form>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 60,
              }}>
              <TouchableOpacity>
                <Text style={{fontSize: 22}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => alert('save')}>
                <Text style={{fontSize: 22}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

export {ModalAddCustomer};
