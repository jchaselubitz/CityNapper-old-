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
    mapLocationPermission: "undetermined",
    boundaryLocationPermission: 'undetermined',
    userFavorites : [],
    currentLatitude: null,
    currentLongitude: null,
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
    permissionsService.primaryPermissionsCheck() 

    //START HERE 

    Permissions.check('location').then(response => { console.log('################### mapLocationPermission',response)
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ mapLocationPermission: response }, () => this.permissionsCheckpoint())
    })
  } 

  permissionsCheckpoint = () => {
    if (this.state.mapLocationPermission === 'undetermined') {
      Alert.alert(
        'Can we access your location?',
        'CityNapper needs permission to track your "always" in order to wake you up when you are close to your stop',
        [
          {
            text: 'No way',
            onPress: () => console.log('Permission denied'), // should send to a failure screen
            style: 'cancel',
          },
          this.state.mapLocationPermission === 'undetermined'
            ? { text: 'OK', onPress: this.requestLocationPermissions }
            : { text: 'Open Settings', onPress: Permissions.openSettings },
        ],
      )
    } else {
      this.watchLocation()
    }
  }

  requestLocationPermissions = () => {
    Permissions.request('location', { type: 'always' }).then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ mapLocationPermission: response })
    })
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
      { enableHighAccuracy: false,
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
recieveDestinationSelection = (destination) => {
  Permissions.check('location', {type: 'always'}).then(response => { console.log('################### boundaryLocationPermission',response)
  // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
  this.setState({ boundaryLocationPermission: response }, () => this.setDestinationLocation(destination))
})
}
setDestinationLocation = (destination) => {
  this.setState({ 
    destLatitude: destination.location.latitude,
    destLongitude: destination.location.longitude,
    destName: destination.name,
    destAddress: destination.address 
  }, () => this.setRoute());
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
checkPermission = () => {
  navigator.geolocation
  .getCurrentPosition(
    () => this.setState({permission: 'GRANTED'}),
    () => this.setState({permission: 'DENIED'})
  );
}


setBoundary() {
    if (this.state.destName !== "-")
    Boundary.add({
      // lat: 51.50998,
      // lng: -0.1337,
      lat: this.state.destLatitude, 
      lng: this.state.destLongitude,
      radius: 500, // in meters
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
      destLatitude: this.state.destLatitude,
      destLongitude: this.state.destLongitude,
      destName: this.state.destName,
      destAddress: this.state.destAddress,
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