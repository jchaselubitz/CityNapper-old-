import React, { Component } from 'react';
import Keys from '../helpers/Keys'
import * as Polyline from '@mapbox/polyline'
import {AppRegistry, Vibration} from 'react-native';
import { Boundary } from 'react-native-boundary'
import SelectionContainer from './SelectionContainer'
import SearchComponent from '../components/SearchComponent'
import { createStackNavigator, withNavigation } from 'react-navigation'

class TripContainer extends Component {
  static navigationOptions = { title: 'TripContainer' }

  state = {
    error: null,
    currentLatitude: null,
    currentLongitude: null,
    destLatitude: null,
    destLongitude: null,
    destName: "-",
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

  //==========BOUNDARY MAPPING FUNCTIONS===============
  //FEATURE: Saved Boundaries that are always on

  setBoundary = () =>  {
    if (this.state.destName !== "-")
    Boundary.add({
      lat: this.state.destLatitude,
      lng: this.state.destLongitude,
      radius: 500, // in meters
      id: this.state.destName,
    })
      .then(() => alert("You have set a location!"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, id => {
      alert(`Wake up! you are at ${id}!!`)
      this.startVibrationFunction()
      
    });
  }

  dropBoundary = (id) => {
    if (id !== "-")
    alert("Location Removed")
    this.stopVibrationFunction()
    Boundary.remove(id)
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


  //=========== Selection ==================

  acceptSelection = () => {
    this.setNap()
  }

  handleSelection = (item) => {
    this.setDestinationLocation(item)
  }


  //==========ROUTE MAPPING FUNCTIONS===============

  setRoute = () => {
    // alert(this.state.destLatitude)
    if (this.props.currentLatitude != null && this.props.destLatitude!=null)
     {
       let concatStart = this.props.currentLatitude +","+this.props.currentLongitude
       let concatDestination = this.props.destLatitude+","+this.props.destLongitude
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

  
  render() { 
      return <SelectionContainer
            currentLatitude={this.state.currentLatitude}
            currentLongitude={this.state.currentLongitude}
            destLatitude={this.state.destLatitude}
            destLongitude={this.state.destLongitude}
            destName={this.state.destName}
            routeCoords={this.state.routeCoords}
            x={this.state.x} 
            handleSelection={this.handleSelection}
            acceptSelection={this.acceptSelection}
            setDestinationLocation={this.setDestinationLocation}
            setRoute={this.setRoute}
            setNap={this.setNap}
            dropBoundary={this.dropBoundary}
            navigation={this.props.navigation}
            />
            
    }
}

export default TripContainer

AppRegistry.registerComponent('CityNapper', () => TripContainer);