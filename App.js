
import React, {Component} from 'react';
import Keys from './src/helpers/Keys'
import * as Polyline from '@mapbox/polyline'
import LoadingComponent from './src/components/LoadingComponent'
import TripPlannerContainer from './src/containers/TripPlannerContainer'
import Boundary, {Events} from 'react-native-boundary';
import {AppRegistry, KeyboardAvoidingView} from 'react-native';

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
          error: null,
          // selectedViewContainer: this.lastSelectedViewContainer()
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  } 

  setDestinationLocation = (destination) => {
    this.setState({ 
      destLatitude: destination.location.latitude,
      destLongitude: destination.location.longitude,
      destName: destination.name,
      destAddress: destination.address 
    }, () => this.setRoute());
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
    // alert(this.state.destLatitude)
    if (this.state.currentLatitude != null && this.state.destLatitude!=null)
     {
       let concatStart = this.state.currentLatitude +","+this.state.currentLongitude
       let concatDestination = this.state.destLatitude+","+this.state.destLongitude
       this.getDirections(concatStart, concatDestination)
     } else {
       alert("insufficient data")
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
    Boundary.add({
      lat: this.state.destLatitude,
      lng: this.state.destLongitude,
      radius: 50, // in meters
      id: this.state.destName,
    })
      .then(() => alert("You have set a location!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, ids => {
      Alert.alert(`Wake up! you are at ${this.state.destName}!!`)
      this.startVibrationFunction()
      
    });
  }

  dropBoundary = (locName) => {
    alert("Location Removed")
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

  lastSelectedViewContainer = () => {
    //This will go to device memory and get the last selected container
    this.setViewContainer("trip")
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
          destName={this.state.destName}
          setDestinationLocation={this.setDestinationLocation}
          setRoute={this.setRoute}
          setNap={this.setNap}
          dropBoundary={this.dropBoundary}
         />
      case "nap":
        return <NapContainer 
          stopVibration={this.stopVibrationFunction}
          dropBoundary={this.dropBoundary}
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

AppRegistry.registerComponent('CityNapper', () => App);