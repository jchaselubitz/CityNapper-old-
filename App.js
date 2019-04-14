//HomeScreen
import React, {Component} from 'react';
import { AppRegistry, Vibration, AsyncStorage } from 'react-native';
import * as Polyline from '@mapbox/polyline'
import Boundary, {Events} from 'react-native-boundary';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import NavigationService from './src/services/navigationService'
import Permissions from 'react-native-permissions'
import Keys from './src/helpers/Keys'
import permissionsService from './src/services/permissionsService'
import TripStack from './src/NavigationStacks'
import pushNotification from './src/services/pushNotification';

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
    this.checkForExistingUser()
    this.checkMapLocationPermissions(() => this.watchLocation())
  } 

  checkForExistingUser = async () => {
    try {
      savedData = await AsyncStorage.multiGet(['userFavorites', 'homeButton', 'workButton'])
      console.log('####', savedData)
      if (savedData !== null) { 
        savedData.map((result, i, store) => {
          this.setUserData( store[i][0], store[i][1])
      })
      } 
    } catch (error) {
      console.log("#### runWakeUp error", error)
    
    }
  }


  setUserData = (key, value) => {
    switch (key) {
      case 'userFavorites':
        console.log('#### user incoming', key, value )
        if (value !== null)
        this.setState({ userFavorites: JSON.parse(value)}, console.log('####', this.state.userFavorites))
      case 'homeButton':
        this.setState({ homeButton: JSON.parse(value)});
      case 'workButton':
        this.setState({ workButton: JSON.parse(value)});
    }
  }


  checkMapLocationPermissions = (nextFunction) => {
    Permissions.check('location').then(response => 
      permissionsService.permissionsCheckpoint(response, nextFunction))
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
  this.checkMapLocationPermissions(this.setBoundary())
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
  this.setState({ homeButton: item }, () => this.sendToLocalStorage('homeButton', item))
  :
  this.setState({ workButton: item }, () => this.sendToLocalStorage('workButton', item));
}

sendToLocalStorage = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log('#### sendToLocalStorage', error)
  }
}



addRemoveFavorite = (item) => {
  locationObject = {item, id: `${item.location.latitude},${item.location.longitude}`}
  if (this.state.userFavorites.map( l => l.id).includes(locationObject.id))
  this.setState({ 
    userFavorites: this.state.userFavorites.filter((favorite) => favorite.id !== locationObject.id)
  }, () => this.sendToLocalStorage('userFavorites', this.state.userFavorites))
  else {
    this.setState({ 
      userFavorites: [...this.state.userFavorites, locationObject]
    }, () => this.sendToLocalStorage('userFavorites', this.state.userFavorites))
  }
}



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
  return this.state.userFavorites.map( l => l.id).includes(`${item.location.latitude},${item.location.longitude}`)
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
  if (this.state.currentLatitude != null && this.state.destLatitude!=null)
   {
     let concatStart = this.state.currentLatitude +","+this.state.currentLongitude
     let concatDestination = this.state.destLatitude+","+this.state.destLongitude
     this.getDirections(concatStart, concatDestination)
   } else {
     alert('It seems you have chosen a destination that is too far away. Try one that is a little closer.')
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
    }}
    ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}
    />;
  }
}

const AppContainer = createAppContainer(TripStack);
console.disableYellowBox = true;

AppRegistry.registerComponent('CityNapper', () => App);

