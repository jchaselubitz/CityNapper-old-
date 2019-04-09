import React, { Component } from 'react';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'
const styles = StyleHelper.styles

export default class NapContainer extends Component {
  // static navigationOptions = { header: null }

  state = {
    
  }

   render () {

    const { navigation } = this.props;
    const destName = navigation.getParam('destName');
    const destAddress = navigation.getParam('destAddress')
    const endNap = navigation.getParam('endNap');

    handleClick = () => {
      endNap()
      navigation.goBack()

    }
     return (
      <View style={styles.napContainer}>
        <TouchableOpacity
          style={styles.endNapButton} 
          onPress={() => handleClick()}
          >
          <Text style={styles.endNapText}>End Nap</Text>
        </TouchableOpacity>
        <View style={styles.tripDisplayCard}>
          <Text style={styles.destinationTitleText}>{destName}</Text>
          <Text style={styles.destinationSubtitleText}>{destAddress}</Text>
        </View>
       </View>
     )
   }

}

AppRegistry.registerComponent('CityNapper', () => NapContainer);

