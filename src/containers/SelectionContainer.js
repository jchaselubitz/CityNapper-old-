import React, { Component } from 'react';
import {AppRegistry, View, Text, Button} from 'react-native';
import StylesHelper from '../helpers/StyleHelper'
import MapContainer from './MapContainer'

export default class SelectionContainer extends Component {

  //acceptSelection

  render() { 
    return (
      <>
      <View style={{
          flex: 6,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
 
          <View style={{
              flex: 3, 
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
              <Text>{this.props.destName !== "" ? this.props.destName : ""}</Text>
            </View>
          </View>
          <View style={{
              flex: 2, 
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <Button title="Search" onPress={() => this.props.switchContainer('search')} />
              <Button title="Start Nap" onPress={() => this.props.acceptSelection()}/>
              <Button title="End Nap" onPress={() => this.props.dropBoundary(this.props.destName)}/>
            </View>
          </View>
  
        </View>
      </>
     );
  }
}
 
AppRegistry.registerComponent('CityNapper', () => SelectionContainer);