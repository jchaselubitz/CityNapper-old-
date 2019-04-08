import StylesHelper from '../helpers/StyleHelper'
import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
const styles = StylesHelper.styles

class ModalHeader extends Component {
  render() {
    return (
      <View style={styles.modalHeader}>
      <Text>
      test
        </Text></View>
    );
  }
}

export default  ModalHeader

AppRegistry.registerComponent('CityNapper', () => ModalHeader);