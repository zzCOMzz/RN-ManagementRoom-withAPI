import React from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import {Input, Item, Label, Icon, Form, Button} from 'native-base';

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
      <Modal
        animationIn="flipInY"
        animationInTiming={1800}
        animationOut="flipOutY"
        animationOutTiming={1800}
        isVisible={this.props.modalVisible}>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            height: Dimensions.get('window').height * 0.7,
            width: Dimensions.get('window').width * 0.8,
            borderRadius: 9,
          }}>
          <Text style={{fontSize: 30, alignSelf: 'center', fontWeight: 'bold'}}>
            {this.props.title}
          </Text>
          <Form
            style={{
              paddingHorizontal: '6%',
              paddingLeft: 0,
            }}>
            <Item stackedLabel style={{marginVertical: '6%'}}>
              <Label>
                <Text>Name*</Text>
              </Label>
              <Input
                value={this.props.name}
                onChangeText={text => this.props.changeName(text)}
              />
            </Item>
            <Item stackedLabel style={{marginVertical: '6%'}}>
              <Label>
                <Text>Identity Number*</Text>
              </Label>
              <Input
                value={this.props.identity}
                onChangeText={text => this.props.changeIdentity(text)}
              />
            </Item>
            <Item stackedLabel style={{marginVertical: '6%'}}>
              <Label>
                <Text>Phone Number*</Text>
              </Label>
              <Input
                value={this.props.phone}
                onChangeText={text => this.props.changePhone(text)}
              />
            </Item>
            <View style={{marginHorizontal: 10}}>
              <Text>Photo (Optional)</Text>
              <Icon name="ios-camera" style={{fontSize: 60, color: 'blue'}} />
            </View>
          </Form>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Button
              transparent
              onPress={() => {
                this.props.onCancel();
              }}
              style={{
                width: 120,
                height: 40,
                backgroundColor: '#ffffff',
                justifyContent: 'center',
                borderRadius: 8.5,
              }}>
              <Text style={{fontSize: 22, color: '#ff4757'}}>Cancel</Text>
            </Button>

            <Button
              onPress={() => this.props.onSubmit()}
              style={{
                width: 120,
                height: 40,
                backgroundColor: '#1B9CFC',
                justifyContent: 'center',
                borderRadius: 8.5,
              }}>
              <Text style={{fontSize: 22, color: 'white'}}>Save</Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export {ModalAddCustomer};
