import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Input, Item, Label} from 'native-base';
import Modal from 'react-native-modal';

class RoomModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        animationInTiming={1000}
        animationOutTiming={1200}
        animationIn="slideInDown">
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            height: Dimensions.get('window').height * 0.4,
            width: Dimensions.get('window').width * 0.7,
            borderRadius: 9,
            padding: 10,
          }}>
          <Text style={{alignSelf: 'center', fontSize: 30, fontWeight: 'bold'}}>
            {this.props.title}
          </Text>
          <View style={{marginTop: 40}}>
            <Item style={{marginVertical: '6%'}}>
              <Label>
                <Text>Room Name</Text>
              </Label>
              <Input
                value={this.props.inputValue}
                onChangeText={text => this.props.inputChangeValue(text)}
              />
            </Item>
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'space-around',
              alignContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => this.props.onCancel()}>
              <Text style={{fontSize: 20}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onSubmit()}>
              <Text style={{fontSize: 20}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default RoomModal;
