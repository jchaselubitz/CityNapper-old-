import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import MapContainer from './MapContainer'

export default class TripPlannerContainer extends Component {

   //logic for displaying following options:
      //Map + selection options
      //search + list
      //when selection is set, map should show route


  state = {
    mapOrSearch: 'map',
    selectionHolder: {}
  }

 
  acceptSelection = () => {
    this.props.setNap
  }

  render() { 
    return (
      <>
        <MapContainer
          currentLatitude={this.props.currentLatitude}
          currentLongitude={this.props.currentLongitude}
          destLatitude={this.props.destLatitude}
          destLongitude={this.props.destLongitude}
          routeCoords={this.props.routeCoords}
          x={this.state.x}
        />
        <SearchComponent 
          currentLatitude={this.props.currentLatitude}
          currentLongitude={this.props.currentLongitude}
          setDestinationLocation={this.setDestinationLocation}
        />
      </>  
     );
  }
}
 
AppRegistry.registerComponent('CityNapper', () => TripPlannerContainer);