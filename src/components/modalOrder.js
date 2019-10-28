import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Input, Item, Label, Icon, Form, Picker} from 'native-base';

import Modal from 'react-native-modal';

class ModalAddNewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
      selected: undefined,
      duration: '',
    };
  }

  onChangeValue = id => {
    this.setState({selected: id});
    this.props.onSelectCusomerId(id);
  };

  changeDuration = duration => {
    this.setState({duration});
    this.props.duration(duration);
  };
  render() {
    return (
      <KeyboardAvoidingView>
        <Modal
          animationIn="slideInUp"
          animationInTiming={1500}
          animationOut="zoomOutDown"
          animationOutTiming={1000}
          isVisible={this.props.modalVisible}
          style={{
            marginHorizontal: 40,
            marginVertical: 20,
            backgroundColor: 'rgba(255,255,255,0.9)',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{fontSize: 30, alignSelf: 'center', fontWeight: 'bold'}}>
              {this.props.title}
            </Text>
            <Form
              style={{
                paddingHorizontal: '4%',
                paddingLeft: 0,
              }}>
              <Item stackedLabel style={{marginVertical: '6%'}}>
                <Label>
                  <Text>Room Name</Text>
                </Label>
                <Input value={this.props.roomName} disabled />
              </Item>
              <Item style={{marginTop: 20}}>
                <Label>
                  <Text>Customer</Text>
                </Label>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{width: undefined}}
                  placeholder="Select Customer"
                  placeholderStyle={{color: '#bfc6ea'}}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected}
                  onValueChange={selected => {
                    this.onChangeValue(selected);
                    console.log('select ', selected);
                  }}>
                  <Picker.Item
                    color="gray"
                    label="Choose Customer"
                    value={undefined}
                  />
                  {this.props.dataCustomer.data <= 0 ? (
                    <View />
                  ) : (
                    this.props.dataCustomer.data.data.map(item => {
                      return (
                        <Picker.Item
                          label={`${item.name} - +${item.phone_number}`}
                          value={item._id}
                        />
                      );
                    })
                  )}
                </Picker>
              </Item>
              <Item stackedLabel style={{marginTop: 30}}>
                <Label>
                  <Text>Duration (minutes)</Text>
                </Label>
                <Input
                  keyboardType="number-pad"
                  value={this.state.duration}
                  onChangeText={text => this.changeDuration(text)}
                />
              </Item>
            </Form>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 60,
              }}>
              <TouchableOpacity onPress={() => this.props.onCancel()}>
                <Text style={{fontSize: 22}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.onSubmit()}>
                <Text style={{fontSize: 22}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

export {ModalAddNewOrder};
