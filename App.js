//HomeScreen
import React, {Component} from 'react';
import Boundary, {Events} from 'react-native-boundary';
import Keys from './src/helpers/Keys'
import permissionsService from './src/services/permissionsService'
import * as Polyline from '@mapbox/polyline'
import TripStack from './src/NavigationStacks'
import pushNotification from './src/services/pushNotification';
import { AppRegistry, Vibration, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import Permissions from 'react-native-permissions'


export default class App extends Component  {

  state = {
    error: null,
    userFavorites : [],
    currentLatitude: null,
    currentLongitude: null,
    destLocation: null,
    destLatitude: null,
    destLongitude: null,
    destName: "-",
    destAddress: '',
    routeCoords: [],
    x: 'true',
    napping: false,
    homeButton: null,
    workButton: null
  }

  componentDidMount () {
    this.checkMapLocationPermissions()
  } 

  checkMapLocationPermissions = () => {
    Permissions.check('location').then(response => 
      permissionsService.permissionsCheckpoint(response, () => this.watchLocation()))
  }

  checkBoundaryLocationPermissions = () => {
    Permissions.check('location', { type: 'always' }).then(response => 
      permissionsService.permissionsCheckpoint(response))
  }

  
  watchLocation = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
          error: null,
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,
        timeout: 200000,
        maximumAge: 1000,
        useSignificantChanges: false
      },
    )
  } 
  

//============= NAP FUNCTIONS ======================

startNap = () => {
  pushNotification.requestPermissions()
  this.setBoundary()
  this.setState({ napping: true  });
} 
   

endNap = () => {
  this.dropBoundary()
  this.stopVibrationFunction()
  this.clearDestinationSelection()
  pushNotification.cancelAllLocalNotifications()
}

//=========== ALERT ==================

PATTERN = [ 50, 50]

startVibrationFunction = () => {
Vibration.vibrate(this.PATTERN, true)
}

stopVibrationFunction = () => {
Vibration.cancel()
}

alertNotification = () => {
pushNotification.localNotification(this.state.destName)
}


//============= SETTER FUNCTIONS ======================

setAsHomeWorkButton = (item, label) => {
  label === "home" 
  ?
  this.setState({ homeButton: item })
  :
  this.setState({ workButton: item  });
}



///NEED TO ADD THESE ELEMENTS TO VIEW CONTAINER
addRemoveFavorite = (locationObject) => {
  if (this.state.userFavorites.map( l => l.id).includes(locationObject.id))
  this.setState({ 
    userFavorites: this.state.userFavorites.filter((favorite) => favorite.id !== locationObject.id)
  })
  else {
    this.setState({ 
      userFavorites: [...this.state.userFavorites, locationObject]
    })
  }
}
///NEED TO ADD THESE ELEMENTS TO VIEW CONTAINER


setDestinationLocation = (destination) => {
  this.checkBoundaryLocationPermissions()
  this.setState({ 
    destLocation: destination,
    destLatitude: destination.location.latitude,
    destLongitude: destination.location.longitude,
    destName: destination.name,
    destAddress: destination.address
  }, () => this.setRoute());
}

isFavorite = (item) => {
  return userFavorites.map( l => l.id).includes(`${item.location.latitude},${item.location.longitude}`)
}

clearDestinationSelection = (link) => {
  this.setState({ 
    destLatitude: null,
    destLongitude: null,
    destName: "-",
    destAddress: '',
    routeCoords: [],
    napping: false,
   }, link )
}

//========== BOUNDARY FUNCTIONS ===============

setBoundary = () => {
    if (this.state.destName !== "-")
    Boundary.add({
      lat: this.state.destLatitude, 
      lng: this.state.destLongitude,
      radius: 200, // in meters
      id: this.state.destName,
    })
      .then(() => console.log("boundary set"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, id => {
      this.alertNotification()
      this.startVibrationFunction()
    });
}

dropBoundary = () => {
  Boundary.removeAll()
  .then(() => console.log('Location Dropped'))
  .catch(e => console.log('failed to drop location', e))
}


//========== ROUTE MAPPING FUNCTIONS ===============

setRoute = () => {
  // alert(this.state.destLatitude)
  if (this.state.currentLatitude != null && this.state.destLatitude!=null)
   {
     let concatStart = this.state.currentLatitude +","+this.state.currentLongitude
     let concatDestination = this.state.destLatitude+","+this.state.destLongitude
     this.getDirections(concatStart, concatDestination)
   } else {
     alert("insufficient data to compose route")
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

//======================================= VIEWS =================================


  render() {
    return <AppContainer screenProps={{
      error: this.state.error,
      userFavorites: this.state.userFavorites,
      currentLatitude: this.state.currentLatitude,
      currentLongitude: this.state.currentLongitude,
      destLocation: this.state.destLocation,
      destLatitude: this.state.destLatitude,
      destLongitude: this.state.destLongitude,
      destName: this.state.destName,
      destAddress: this.state.destAddress,
      isFavorite: this.isFavorite,
      routeCoords: this.state.routeCoords,
      x: this.state.x,
      napping: this.state.napping,
      startNap: this.startNap,
      endNap: this.endNap,
      rejectSelection: this.rejectSelection,
      addRemoveFavorite: this.addRemoveFavorite,
      setDestinationLocation: this.setDestinationLocation,
      dropBoundary: this.dropBoundary,
      clearDestinationSelection: this.clearDestinationSelection,
      setAsHomeWorkButton: this.setAsHomeWorkButton,
      homeButton: this.state.homeButton,
      workButton: this.state.workButton
    }}/>;
  }
}

const AppContainer = createAppContainer(TripStack);
console.disableYellowBox = true;

AppRegistry.registerComponent('CityNapper', () => App);