import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  AsyncStorage,
  StatusBar,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  Input,
  Label,
  Item,
  Icon,
  Spinner,
  Form,
  Button,
  Card,
  CardItem,
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {Host} from '../functions/Host';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isVisible: true,
      btnActive: true,
      isError: false,
      isLoading: false,
    };
  }

  handleVisibel = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  handlePassword = password => {
    this.setState({password});
  };

  handleUsername = username => {
    this.setState({username});
  };

  handleSubmit = () => {
    Keyboard.dismiss();
    const {username, password} = this.state;
    if (username && password) {
      this.setState({isLoading: true});
      axios
        .post(`${Host}/auth/login`, {
          username,
          password,
        })
        .then(res => {
          const {data} = res;
          if (data.success) {
            AsyncStorage.setItem('token', data.token);
            AsyncStorage.setItem('admin', data.username);
            AsyncStorage.setItem('admin-id', data.adminId);

            this.setState({isLoading: false});
            return this.props.navigation.navigate('Loading');
          } else {
            ToastAndroid.showWithGravity(
              `${data.message}`,
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
              25,
              30,
            );
            this.setState({isLoading: false, username: '', password: ''});
          }
        });
    } else {
      ToastAndroid.showWithGravity('Data Not Valid', ToastAndroid.LONG, 0);
      this.setState({username: '', password: ''});
      this.setState({});
    }
  };
  render() {
    const {isVisible, isLoading} = this.state;
    return (
      <LinearGradient
        style={{height: '100%', flex: 1}}
        colors={['#d1d8e0', '#d2dae2', '#ced6e0', '#f5f6fa', '#ffffff']}>
        <StatusBar backgroundColor="#d1d8e0" barStyle="dark-content" />
        <View>
          <KeyboardAvoidingView behavior="position">
            <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
              <View style={Styles.headerTop}>
                <Image
                  source={require('../Assets/images/disewa.jpg')}
                  style={Styles.imageContainer}
                />
                <View style={Styles.containerTextHeader}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: '#2f3542',
                      fontFamily: 'Roboto',
                      fontWeight: 'bold',
                    }}>
                    WELCOME
                  </Text>
                </View>
              </View>

              <Card
                style={{
                  borderRadius: 20,
                  marginTop: '5%',
                }}>
                <Form style={Styles.formContainer}>
                  <View>
                    <CardItem>
                      <Item floatingLabel style={Styles.itemInput}>
                        <Label style={{color: 'grey'}}>Username</Label>
                        <Input
                          onChangeText={text => this.handleUsername(text)}
                          returnKeyType="next"
                          value={this.state.username}
                          autoCapitalize="none"
                        />
                      </Item>
                    </CardItem>
                    <CardItem>
                      <Item floatingLabel style={Styles.itemInput}>
                        <Label>Password</Label>
                        <Input
                          secureTextEntry={isVisible}
                          value={this.state.password}
                          autoCapitalize="none"
                          onChangeText={text => this.handlePassword(text)}
                          returnKeyType="done"
                        />
                        {isVisible ? (
                          <Icon
                            name="ios-eye-off"
                            onPress={() => this.handleVisibel()}
                          />
                        ) : (
                          <Icon
                            name="ios-eye"
                            onPress={() => this.handleVisibel()}
                          />
                        )}
                      </Item>
                    </CardItem>

                    <View style={Styles.containerBtn}>
                      <LinearGradient
                        style={[Styles.btnSignin]}
                        colors={['#4b7bec', '#3b5998', '#192f6a']}>
                        <TouchableOpacity onPress={() => this.handleSubmit()}>
                          {isLoading ? (
                            <Spinner color="white" />
                          ) : (
                            <Text style={Styles.textSign}>Sign In</Text>
                          )}
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </Form>
              </Card>
            </View>
          </KeyboardAvoidingView>
        </View>
      </LinearGradient>
    );
  }
}

export default Login;

const Styles = StyleSheet.create({
  headerTop: {
    alignItems: 'center',
    marginTop: Dimensions.get('screen').height * 0.05,
  },
  containerTextHeader: {
    alignItems: 'center',
    margin: '5%',
  },
  imageContainer: {width: 180, height: 180, borderRadius: 12},
  formContainer: {marginTop: '5%', paddingHorizontal: 26},
  btnSubmitView: {marginTop: 40},
  btnSignin: {
    height: 45,

    borderRadius: 10.5,
    // backgroundColor: '#4b7bec',
    borderColor: '#d1d8e0',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 1,
    },
    shadowOpacity: 0.44,
    shadowRadius: 8.27,
    elevation: 5,
  },
  containerBtn: {
    justifyContent: 'center',
    marginTop: '15%',
  },
  textSign: {
    fontSize: 23,
    color: 'white',
    fontFamily: 'Roboto',
    alignSelf: 'center',
  },
  itemInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#747d8c',
  },
});
