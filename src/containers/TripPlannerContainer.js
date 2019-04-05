import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
import StylesHelper from '../helpers/StyleHelper'
import MapContainer from './MapContainer'
import SearchComponent from '../components/SearchComponent'
import SelectionContainer from './SelectionContainer'

export default class TripPlannerContainer extends Component {

   //logic for displaying following options:
      //Map + selection options
      //search + list
      //when selection is set, map should show route

  state = {
    selectedLocalContainer: 'main',
    selectionHolder: {}
  }

  acceptSelection = () => {
    this.props.setNap
  }

  showViewContainer = () => {
    switch (this.state.selectedLocalContainer) {
      case "main":
        return <SelectionContainer
          currentLatitude={this.props.currentLatitude}
          currentLongitude={this.props.currentLongitude}
          destLatitude={this.props.destLatitude}
          destLongitude={this.props.destLongitude}
          routeCoords={this.props.routeCoords}
          x={this.props.x} 
          acceptSelection={this.acceptSelection}
          />
      case "search":
        return <SearchComponent 
          currentLatitude={this.props.currentLatitude}
          currentLongitude={this.props.currentLongitude}
          setDestinationLocation={this.props.setDestinationLocation}
          />
      default:
        return <LoadingComponent />  
    }
  }

  render() { 
    return (
      <>
      {this.showViewContainer()}
      </>
     );
  }
}
 
AppRegistry.registerComponent('CityNapper', () => TripPlannerContainer);