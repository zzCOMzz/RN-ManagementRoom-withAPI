import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'native-base';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
          },
          this.props.stylesHeader,
        ]}>
        <Text style={{fontSize: 30, color: 'white'}}>
          {this.props.titleText}
        </Text>
      </View>
    );
  }
}

export default Header;