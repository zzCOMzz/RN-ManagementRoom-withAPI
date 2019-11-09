import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

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
            height: 50,
            backgroundColor: this.props.DarkMode.header,
            elevation: 3,
          },
          this.props.stylesHeader,
        ]}>
        <Text
          style={[
            {fontSize: 30, color: this.props.DarkMode.text, marginTop: 3},
            this.props.styleText,
          ]}>
          {this.props.titleText}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    DarkMode: state.setDarkMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
