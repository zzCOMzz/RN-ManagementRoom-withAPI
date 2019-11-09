import React from 'react';
import {View, Text, TouchableOpacity, Switch, StatusBar} from 'react-native';
import {Body, Thumbnail, Left, Card, CardItem, Icon, Right} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/header';

import AsyncStorage from '@react-native-community/async-storage';
import {getUserToken, getAdminId} from '../functions';
import {connect} from 'react-redux';
import {actionGetAllOrder} from '../redux/actions/actionOrder';
import {
  actionSetDarkMode,
  actionSetVibrate,
} from '../redux/actions/actionSetting';

class Setting extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isVibrate: false,
      isDarkmode: false,
    };
    this.props.navigation.setParams({
      bottom: this.props.DarkMode.bottom,
    });
  }
  async componentDidMount() {
    AsyncStorage.getItem('admin').then(username => {
      this.setState({username});
    });
    const token = await getUserToken();
    const id = await getAdminId();

    await this.props.getAllOrder(token, id);
  }
  render() {
    let hd = this.props.darkMode.isDarkmode
      ? {header: '#34495e'}
      : {header: 'white'};
    return (
      <View style={{flex: 1, backgroundColor: this.props.DarkMode.background}}>
        <Header titleText="Setting" />
        <StatusBar
          backgroundColor={this.props.DarkMode.status}
          barStyle={
            this.props.DarkMode.isDarkmode ? 'light-content' : 'dark-content'
          }
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
                <Text style={{fontSize: 22, color: this.props.darkMode.text}}>
                  Admin
                </Text>
                <Text style={{fontSize: 16}} note>
                  {this.state.username}
                </Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('History', {
                header: this.props.DarkMode.header,
                text: this.props.DarkMode.text,
              })
            }>
            <CardItem>
              <Left>
                <IconFA name="history" size={28} />
                <Text style={{fontSize: 20, marginLeft: 20}}>
                  History Order
                </Text>
              </Left>
              <Right>
                <Icon style={{fontSize: 28}} name="ios-arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>

        <Text
          style={{
            fontSize: 22,
            color: this.props.DarkMode.text,
            marginLeft: '5%',
            marginTop: '3%',
          }}>
          Setting
        </Text>
        <Card>
          <CardItem>
            <IconMA name="vibration" size={28} />
            <Text style={{fontSize: 20, marginLeft: 20}}>Vibrate Mode</Text>
            <Left />
            <Right>
              <Switch
                trackColor="gray"
                value={this.props.isVibrate}
                onValueChange={() =>
                  // this.setState({isVibrate: !this.state.isVibrate})
                  this.props.vibrate()
                }
              />
            </Right>
          </CardItem>
          <CardItem>
            <Icon
              name={this.props.DarkMode.isDarkmode ? 'ios-moon' : 'ios-sunny'}
              size={28}
            />
            <Text style={{fontSize: 20, marginLeft: 20}}>Dark Mode</Text>
            <Left />
            <Right>
              <Switch
                trackColor="gray"
                value={this.props.DarkMode.isDarkmode}
                onValueChange={() => {
                  this.props.navigation.setParams({
                    bottom: this.props.DarkMode.isDarkmode ? '#fff' : '#2f3542',
                  });
                  this.props.darkMode(!this.props.DarkMode.isDarkmode);
                }}
              />
            </Right>
          </CardItem>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.clear();
              this.props.navigation.navigate('Loading');
            }}>
            <CardItem>
              <Text style={{fontSize: 20}}>LOGOUT</Text>
              <Right />
              <Right>
                <Icon style={{fontSize: 28}} name="ios-log-out" />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    allOrder: state.getAllOrder,
    DarkMode: state.setDarkMode,
    isVibrate: state.setVibrate.isVibrate,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrder: (token, id) => dispatch(actionGetAllOrder(token, id)),
    darkMode: params => dispatch(actionSetDarkMode(params)),
    vibrate: () => dispatch(actionSetVibrate()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
