import React, { Component } from 'react';
import {AppRegistry, View, Text, Button, TouchableOpacity} from 'react-native';
import Permissions from 'react-native-permissions'
import StyleHelper from '../helpers/StyleHelper'
import permissionsService from '../services/permissionsService'

const { getStyles, getColors } = StyleHelper

class LocationErrorContainer extends Component {
  static navigationOptions = { header: null }

  tryAgainButton = () => {
    Permissions.check('location', { type: 'always' })
    .then(response => 
      permissionsService.permissionsCheckpoint(response, () => this.props.navigation.navigate('Trip')))
  
  }

  getPermissionStatus = () => {
    Permissions.check('location', { type: 'always'})
    .then(response => { return response })
  }
  
  buttonPresenter = () => {
    response = this.getPermissionStatus()
      if (response === 'undetermined' || response === 'authorized') {
        return <TouchableOpacity 
          onPress={() => this.tryAgainButton()}
          style={getStyles().warningActionOutlineButton} 
          >
          <View>
            <Text style={getStyles().warningActionButtonOutlineText}> Try again </Text>
          </View>
      </TouchableOpacity>
        
      } else {
        return <> 
        <TouchableOpacity 
        onPress={Permissions.openSettings}
        style={getStyles().warningActionButton} 
        >
        <View>
          <Text style={getStyles().warningActionButtonText}> Go to Settings </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.tryAgainButton()}>
        <View style={getStyles().warningActionOutlineButton} >
          <Text style={getStyles().warningActionButtonOutlineText}> Try again </Text>
        </View>
      </TouchableOpacity>   
      </> 
      }
  }

                    
  render() { 
    return (  
      <View style={getStyles().warningScreenContainer}>
        <View style={getStyles().warningContainer}>
          <Text style={getStyles().warningTitleText}>
          CityNapper needs location access.
          </Text>
          <Text style={getStyles().warningText}>
          Unfortunately, CityNapper only works when it has access to your location. If you would like to use CityNapper in the future, you can give it location access in your iPhone's Settings app.
          </Text>
          {this.buttonPresenter()}
          
        {/* <TouchableOpacity onPress={Permissions.openSettings}>
          <View style={getStyles().warningActionButton} >
            <Text style={getStyles().warningActionButtonText}> Go to Settings </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Trip')}>
          <View style={getStyles().warningActionButtonOutLine} >
            <Text style={getStyles().warningActionButtonOutlineText}> Try again </Text>
          </View>
        </TouchableOpacity> */}

        </View>
      </View>
    );
  }
}
 
export default LocationErrorContainer;


AppRegistry.registerComponent('CityNapper', () => LocationErrorContainer);