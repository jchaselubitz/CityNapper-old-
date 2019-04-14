import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, Button, TouchableOpacity} from 'react-native';
import Permissions from 'react-native-permissions'
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class LocationErrorContainer extends Component {
  static navigationOptions = { header: null }


  getPermissionStatus = () => {
    Permissions.check('location')
    .then(response => { return response })
  }
  
  tryAgainButton = () => {
    response = this.getPermissionStatus()
      if (response === 'undetermined') {
        return <TouchableOpacity 
          onPress={() => this.props.navigation.navigate('Trip')}
          style={styles.warningActionOutlineButton} 
          >
          <View>
            <Text style={styles.warningActionButtonOutlineText}> Try again </Text>
          </View>
      </TouchableOpacity>
        
      } else {
        return <TouchableOpacity 
        onPress={Permissions.openSettings}
        style={styles.warningActionButton} 
        >
        <View>
          <Text style={styles.warningActionButtonText}> Go to Settings </Text>
        </View>
      </TouchableOpacity>
      
      }
  }

                    
  render() { 
    return (  
      <View style={styles.warningScreenContainer}>
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitleText}>
          CityNapper needs location access.
          </Text>
          <Text style={styles.warningText}>
          Unfortunately, CityNapper only works when it has access to your location. If you would like to use CityNapper in the future, you can give it location access in your iPhone's Settings app.
          </Text>
          {/* {this.tryAgainButton()} */}
          
        <TouchableOpacity onPress={Permissions.openSettings}>
          <View style={styles.warningActionButton} >
            <Text style={styles.warningActionButtonText}> Go to Settings </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Trip')}>
          <View style={styles.warningActionButtonOutLine} >
            <Text style={styles.warningActionButtonOutlineText}> Try again </Text>
          </View>
        </TouchableOpacity>

        </View>
      </View>
    );
  }
}
 
export default LocationErrorContainer;


AppRegistry.registerComponent('CityNapper', () => LocationErrorContainer);