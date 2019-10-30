import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Body, Thumbnail, Left, Card, CardItem, Icon, Right} from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Header from '../components/header';
import {ThemeColor} from '../Assets/constantColor';
import AsyncStorage from '@react-native-community/async-storage';
import {getUserToken, getAdminId} from '../functions';
import {connect} from 'react-redux';
import {actionGetAllOrder} from '../redux/actions/actionOrder';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }
  async componentDidMount() {
    const token = await getUserToken();
    const id = await getAdminId();
    await this.props.getAllOrder(token, id);
    const username = await AsyncStorage.getItem('admin');
    this.setState({username});
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
                <Text note>{this.state.username}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History')}>
            <CardItem>
              <IconFA name="history" size={25} />
              <Text style={{fontSize: 20, marginLeft: 18}}>History Order</Text>
              <Left />

              <Right>
                <Icon style={{fontSize: 28}} name="ios-arrow-forward" />
              </Right>
            </CardItem>
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllOrder: token => dispatch(actionGetAllOrder(token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
