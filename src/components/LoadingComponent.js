import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'

export default class LoadingComponent extends Component {

  render() { 
    return (
      <>
      <View style={{
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Text>
          Loading
        </Text>
      </View>
      </>  
     );
  }
}
 
AppRegistry.registerComponent('CityNapper', () => LoadingComponent);