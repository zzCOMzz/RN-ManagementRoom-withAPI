import React from 'react';
import {Text, View, TouchableOpacity, Dimensions, Image} from 'react-native';
import {Input, Item, Label, Icon, Form, Button} from 'native-base';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-picker';
class ModalAddCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible,
      image: '',
    };
  }

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
          fileName: response.fileName,
          type: response.type,
        };

        this.setState({
          image,
        });
      }
    });
  };
  render() {
    console.log('Image ', this.props.image);
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
            height: Dimensions.get('window').height * 0.8,
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
            <Item stackedLabel style={{marginVertical: '3%'}}>
              <Label>
                <Text>Name*</Text>
              </Label>
              <Input
                value={this.props.name}
                onChangeText={text => this.props.changeName(text)}
              />
            </Item>
            <Item stackedLabel style={{marginVertical: '3%'}}>
              <Label>
                <Text>Identity Number*</Text>
              </Label>
              <Input
                keyboardType="numeric"
                value={this.props.identity}
                onChangeText={text => this.props.changeIdentity(text)}
              />
            </Item>
            <Item stackedLabel style={{marginVertical: '3%'}}>
              <Label>
                <Text>Phone Number*</Text>
              </Label>
              <Input
                keyboardType="name-phone-pad"
                value={this.props.phone}
                onChangeText={text => this.props.changePhone(text)}
              />
            </Item>
            <View style={{marginHorizontal: 10}}>
              <Text>Photo (KTP/ SIM/ Paspor)</Text>

              <Image
                source={this.props.image}
                style={{width: 160, height: 140}}
              />

              <Icon
                onPress={() => this.props.handleAddPhoto()}
                name="ios-camera"
                style={{fontSize: 40, color: 'blue', alignSelf: 'center'}}
              />
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
