import React from 'react';
import {
  Text,
  Dimensions,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Input, Item, Label, Icon, Form, Picker, Button} from 'native-base';

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
          animationInTiming={1600}
          animationOut="zoomOutDown"
          animationOutTiming={1800}
          isVisible={this.props.modalVisible}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: 'white',
              height: Dimensions.get('window').height * 0.65,
              width: Dimensions.get('window').width * 0.8,
              borderRadius: 9,
            }}>
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
              <Button
                onPress={() => this.props.onCancel()}
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
                onPress={async () => {
                  await this.props.onSubmit();
                  this.setState({duration: 0, selected: undefined});
                }}
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
      </KeyboardAvoidingView>
    );
  }
}

export {ModalAddNewOrder};
