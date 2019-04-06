import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
import {Button, LinearGradient} from 'react-native-elements';
import StylesHelper from '../helpers/StyleHelper'
import MapContainer from './MapContainer'
import { withNavigation } from 'react-navigation'

class SelectionContainer extends Component {

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
            <View style={{padding: 30}}>
         
            <Button
              title="Search"
              type="outline" 
              onPress={() => this.props.navigation.navigate('search', {
                currentLatitude: this.props.currentLatitude,
                currentLongitude: this.props.currentLongitude,
                handleSelection: this.props.handleSelection,
              })}
             />

            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <Button buttonStyle={{margin: 10}}  title="Start Nap" onPress={() => this.props.acceptSelection()}/>
              <Button buttonStyle={{margin: 10}} title="End Nap" onPress={() => this.props.dropBoundary(this.props.destName)}/>
            </View>
          </View>
  
        </View>
      </>
     );
  }
}


export default withNavigation(SelectionContainer)
 
AppRegistry.registerComponent('CityNapper', () => SelectionContainer);