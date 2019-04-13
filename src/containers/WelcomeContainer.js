import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'

class WelcomeContainer extends Component {
  state = {  }
  render() { 
    return (  
      <View>
        <Text>
          Introduction - what it does and why it needs permissions
          button to click ok
          runWakeUp
        </Text>
        <Button title="main" onPress={navigator.navigate('Trip')} />
      </View>
    );
  }
}
 
export default WelcomeContainer;


AppRegistry.registerComponent('CityNapper', () => WelcomeContainer);