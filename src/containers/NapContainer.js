import React, { Component } from 'react';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'
const styles = StyleHelper.styles

// This shows the running nap
    // needs ability to cancel boundary 
// End Nap
    // Needs ability to stop alarm


export default class NapContainer extends Component {
  state = {
    
  }

   render () {

    const { navigation } = this.props;
    const destName = navigation.getParam('destName');
    const endNap = navigation.getParam('endNap');

    handleClick = () => {
      endNap()
      navigation.goBack()

    }
     return (
       <View>
         <Text>{destName}</Text>
        <TouchableOpacity
          style={styles.buttonFavorite} 
          onPress={() => handleClick()}
          >
          <Text style={styles.buttonFavoriteText}>End Nap</Text>
        </TouchableOpacity>
       </View>
     )
   }

}

AppRegistry.registerComponent('CityNapper', () => NapContainer);