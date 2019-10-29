import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Body, Thumbnail, Left, Card, CardItem, Icon, Right} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';
import AsyncStorage from '@react-native-community/async-storage';
class Setting extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          titleText="Setting"
          stylesHeader={{backgroundColor: ThemeColor, height: 50}}
        />
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri:
                    'https://png.pngtree.com/svg/20170527/unknown_elephant_5068.png',
                }}
              />
              <Body>
                <Text>Admin</Text>
                <Text note>Admin Name</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <IconFA name="history" size={25} />
            <Text style={{fontSize: 20, marginLeft: 18}}>History Order</Text>
            <Left />

            <Right>
              <Icon style={{fontSize: 28}} name="ios-arrow-forward" />
            </Right>
          </CardItem>
        </Card>

        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => {
            AsyncStorage.clear();
            this.props.navigation.navigate('Loading');
          }}>
          <Card>
            <CardItem>
              <Text style={{fontSize: 20}}>LOGOUT</Text>
              <Right />
              <Right>
                <Icon style={{fontSize: 28}} name="ios-log-out" />
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Setting;
