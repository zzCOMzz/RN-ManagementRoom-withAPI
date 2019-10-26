import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Alert,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {Input, Label, Item, Icon, Spinner, Form} from 'native-base';
import axios from 'axios';
import {Host} from '../functions/Host';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isVisible: true,
      isEmailValid: false,
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
            AsyncStorage.setItem('AdminId', data.adminId);
            this.setState({isLoading: false});
            return this.props.navigation.navigate('App');
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
    }
  };
  render() {
    const {isVisible, isEmailValid, isLoading} = this.state;
    return (
      <View>
        <KeyboardAvoidingView behavior="position">
          <View style={{justifyContent: 'center'}}>
            <View style={Styles.headerTop}>
              <View style={Styles.containerTextHeader}>
                <Text style={{fontSize: 40}}>LOG IN</Text>
              </View>
            </View>

            <Form style={Styles.formContainer}>
              {isLoading ? (
                <Spinner />
              ) : (
                <View>
                  <Item floatingLabel>
                    <Label
                      style={isEmailValid ? {color: 'blue'} : {color: 'grey'}}>
                      Username
                    </Label>
                    <Input
                      onChangeText={text => this.handleUsername(text)}
                      returnKeyType="next"
                      autoCapitalize="none"
                    />
                  </Item>
                  <Item floatingLabel>
                    <Label>Password</Label>
                    <Input
                      secureTextEntry={isVisible}
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
                  <TouchableOpacity onPress={() => this.handleSubmit()}>
                    <View
                      style={{
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginBottom: '5%',
                        marginTop: '5%',
                      }}>
                      <Text style={{fontSize: 23, fontStyle: 'italic'}}>
                        Login
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </Form>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Login;

const Styles = StyleSheet.create({
  headerTop: {alignItems: 'center', marginTop: 40},
  containerTextHeader: {alignItems: 'center', marginTop: 25},
  imageContainer: {width: 150, height: 150},
  formContainer: {marginTop: '12%', paddingRight: 15},
  btnSubmitView: {marginTop: 40, paddingHorizontal: 40},
});
