import React, { Component } from 'react';
import {AppRegistry, View, Button} from 'react-native';
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
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <Button title="Search" onPress={() => this.props.switchContainer('search')} />
              <Button title="Start Nap" />
            </View>
          </View>
  
        </View>
      </>
     );
  }
}
 
AppRegistry.registerComponent('CityNapper', () => SelectionContainer);