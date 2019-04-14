import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, Button, TouchableOpacity} from 'react-native';
import Permissions from 'react-native-permissions'
import StyleHelper from '../helpers/StyleHelper'

class LocationErrorContainer extends Component {
  static navigationOptions = { header: null }

  state = {  }
  render() { 
    return (  
      <View>
        <Text>
        Unfortunately, CityNapper only works when it has access to your location. If you would like to use CityNapper in the future, you can give it location access in your iPhone's Settings app.
        </Text>
        <Button onPress={Permissions.openSettings} title='Go to Settings' />
      </View>
    );
  }
}
 
export default LocationErrorContainer;


AppRegistry.registerComponent('CityNapper', () => LocationErrorContainer);