
import React, {Component} from 'react';
import Keys from '../helpers/Keys'
import * as Polyline from '@mapbox/polyline'
import TripPlannerContainer from './src/containers/TripPlannerContainer'
import Boundary, {Events} from 'react-native-boundary';
import {AppRegistry} from 'react-native';

export default class App extends Component  {
  state = {
    error: null,
    selectedViewContainer: "trip",
    currentLatitude: null,
    currentLongitude: null,
    destLatitude: null,
    destLongitude: null,
    destName: "",
    destAddress: '',
    routeCoords: [],
    x: 'true'
  }

  componentDidMount () {
    navigator.geolocation.requestAuthorization()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
          error: null
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  } 

  setDestinationLocation = (location) => {
    this.setState({ 
      destLatitude: location.latitude,
      destLongitude:location.longitude,
      destName: location.name,
      destAddress: location.address 
    });
  }

  setNap = () => {
    this.setBoundary()

    //switches to nap Running
     //props include 
        //destination name
        //this.dropBoundary
        //this.stopVibrationFunction
  }
  //==========ROUTE MAPPING FUNCTIONS===============

  setRoute = () => {
    if (this.state.currentLatitude != null && this.state.currentLongitude!=null)
     {
       let concatStart = this.state.currentLatitude +","+this.state.currentLongitude
       let concatDestination = this.state.destLatitude +","+this.state.destLongitude
       this.getDirections(concatStart, concatDestination)
     }
  }

  async getDirections(tripOrigin, tripDestination) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${tripOrigin}&destination=${tripDestination}&key=${Keys.GoogleKey}`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({routeCoords: coords})
        return coords
    } catch(error) {
        alert(error)
        return error
    }
  }

  //==========BOUNDARY MAPPING FUNCTIONS===============

  setBoundary = () =>  {
    Alert.alert("You have set a location")
    
    Boundary.add({
      lat: this.state.destLatitude,
      lng: this.state.destLongitude,
      radius: 50, // in meters
      id: this.state.destName,
    })
      .then(() => console.log("success!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, ids => {
      Alert.alert(`Wake up! you are at ${this.state.destName}!!`)
      this.startVibrationFunction()
      
    });
  }

  dropBoundary = (locName) => {
    Alert.alert("Location Removed")
    Boundary.remove(locName)
    .then(() => console.log('Location Dropped'))
    .catch(e => console.log('failed to drop location', e))
  }

  //===========ALERT==================

  PATTERN = [ 100, 50] ;

  startVibrationFunction = () => {
    Vibration.vibrate(PATTERN, true)
  }

  stopVibrationFunction = () => {
    Vibration.cancel()
  }


   //==========VIEW FUNCTIONS===============

  setViewContainer = (container) => {
    this.setState({ selectedViewContainer: container });
  }

  showViewContainer = () => {
    switch (this.state.selectedViewContainer) {
      case "trip":
        return <TripPlannerContainer 
          currentLatitude={this.state.currentLatitude}
          currentLongitude={this.state.currentLongitude}
          routeCoords={this.state.routeCoords}
          x={this.state.x}
          destLatitude={this.state.destLatitude}
          destLongitude={this.state.destLongitude}
          setDestinationLocation={this.setDestinationLocation}
          setRoute={this.setRoute}
          setNap={this.setNap}
         />
      case "nap":
        return <NapContainer stopVibration={this.stopVibrationFunction} /> 
      default:
        return <TripPlannerContainer />  
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

AppRegistry.registerComponent('CityNapper', () => App);