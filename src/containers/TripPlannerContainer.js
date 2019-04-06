import React, { Component } from 'react';
import {AppRegistry, View, Text} from 'react-native';
import StylesHelper from '../helpers/StyleHelper'
import MapContainer from './MapContainer'
import SearchComponent from '../components/SearchComponent'
import SelectionContainer from './SelectionContainer'
import { createStackNavigator, createAppContainer } from 'react-navigation'

export default class TripPlannerContainer extends Component {

  state = {
    selectedLocalContainer: 'main',
    selectionHolder: {}
  }

  acceptSelection = () => {
    this.props.setNap()
  }

  setContainerSelection = (string) => {
    this.setState({ selectedLocalContainer: string });
  }

  handleSelection = (item) => {
    this.props.setDestinationLocation(item)
    this.setContainerSelection("main")
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
          switchContainer={this.setContainerSelection}
          destName={this.props.destName}
          dropBoundary={this.props.dropBoundary}
          />
      case "search":
        return <SearchComponent 
          currentLatitude={this.props.currentLatitude}
          currentLongitude={this.props.currentLongitude}
          handleSelection={this.handleSelection}
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