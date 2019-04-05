import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
import StylesHelper from '../helpers/StyleHelper'
import MapContainer from './MapContainer'

export default class SelectionContainer extends Component {

  //acceptSelection

  render() { 
    return (
      <>
      <View style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
 
          <View style={{
              flex: 1, 
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <MapContainer
              currentLatitude={this.props.currentLatitude}
              currentLongitude={this.props.currentLongitude}
              destLatitude={this.props.destLatitude}
              destLongitude={this.props.destLongitude}
              routeCoords={this.props.routeCoords}
              x={this.props.x}
            />
          </View>
   
          <View style={{
              flex: 1, 
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <Text>
              Just some silly text
            </Text>
           
          </View>
  
        </View>
      </>
     );
  }
}
 
AppRegistry.registerComponent('CityNapper', () => SelectionContainer);