import React, { Component } from 'react';
import Keys from '../helpers/Keys'
import * as Polyline from '@mapbox/polyline'
import MapContainer from './MapContainer'
import { Icon } from 'react-native-elements';
import pushNotification from '../services/pushNotification'
import {AppRegistry, Vibration, View, Text, TouchableOpacity} from 'react-native';
import Boundary, {Events} from 'react-native-boundary';
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

const PATTERN = [ 50, 50]


class TripContainer extends Component {
  static navigationOptions = { header: null }

  state = {
    error: null,
    currentLatitude: null,
    currentLongitude: null,
    destLatitude: null,
    destLongitude: null,
    destName: "-",
    destAddress: '',
    routeCoords: [],
    x: 'true',
    napping: false,
  }

  componentDidMount () {
    // configurePushNotifications()
    navigator.geolocation.requestAuthorization()
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
          error: null,
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    )
  } 



//============= NAP FUNCTIONS ======================

  startNap = () => {
    pushNotification.requestPermissions()
    this.setBoundary()
    this.setState({ napping: true  });
    this.goToNap()
  } 
     
  goToNap = () => {
    this.props.navigation.navigate('Nap', {
      destName: this.state.destName,
      destAddress: this.state.destAddress,
      endNap: this.endNap
    })
  }

  endNap = () => {
    this.dropBoundary()
    this.stopVibrationFunction()
    this.clearDestinationSelection()
    pushNotification.cancelAllLocalNotifications()
  }

//=========== ALERT ==================


startVibrationFunction = () => {
  Vibration.vibrate(PATTERN, true)
}

stopVibrationFunction = () => {
  Vibration.cancel()
}

alertNotification = () => {
  pushNotification.localNotification()
}

//============= SETTER FUNCTIONS ======================

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
  
  rejectSelection = () => {
    this.clearDestinationSelection(
      () => this.props.navigation.navigate('Search', {
      currentLatitude: this.state.currentLatitude,
      currentLongitude: this.state.currentLongitude,
      setDestinationLocation: this.setDestinationLocation,
    }))
    this.dropBoundary()

  }

  //========== BOUNDARY FUNCTIONS ===============
 

  setBoundary = () =>  {
    if (this.state.destName !== "-")
    Boundary.add({
      lat: 51.50998, //this.state.destLatitude
      lng: -0.1337, //this.state.destLongitude,
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

  //======================================= VIEWS =================================
  
  CreateView = () => {
    return (
      <View style={styles.tripSelectionContainer}>
       
        <TouchableOpacity
        style={styles.buttonSearch}
        onPress={() => this.props.navigation.navigate('Search', {
          currentLatitude: this.state.currentLatitude,
          currentLongitude: this.state.currentLongitude,
          setDestinationLocation: this.setDestinationLocation,
        })}>
        <View style={styles.searchButtonContainer}>
        <View style={styles.listIcon}>
              <Icon
                  name='search'
                  type='material'
                  color={NapColors.primaryBlue}
                />
              </View>
        <Text style={styles.searchButtonText}>Where are you going?</Text>
        </View>
      </TouchableOpacity>
     
      <View style={styles.tripSelectionCard}>
        <TouchableOpacity  style={styles.buttonFavorite} >
        <View style={styles.buttonContainer}>
            <View style={styles.listIcon}>
              <Icon
                  name='home'
                  type='material'
                  color='white'
                />
              </View>
          <Text style={styles.buttonFavoriteText}>Home stop</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => pushNotification.localNotification()}
          style={styles.buttonFavorite} >

        <View style={styles.buttonContainer}>
            <View style={styles.listIcon}>
              <Icon
                  name='work'
                  type='material'
                  color='white'
                />
              </View>
          <Text style={styles.buttonFavoriteText}>Work stop</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
    )
  }

  DisplayView = () => {
    return (
      <View style={styles.tripSelectionContainer}>
          {this.state.napping === false
        ?   
          <TouchableOpacity
            style={styles.buttonStartNap}
            onPress={() => this.startNap()}>
            <Text style={styles.buttonNapText}>Start Nap</Text>
          </TouchableOpacity>
        :
          <TouchableOpacity
            style={styles.buttonStartNap}
            onPress={() => this.goToNap()}>
            <Text style={styles.buttonNapText}>Resume Nap</Text>
          </TouchableOpacity>
        }
          <View style={styles.tripDisplayCard}>
          {this.state.destName === "-" ? 
            "The name for this destination is missing!" 
            : 
            <>
            <View style={{
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
               }}>
              <Text style={styles.destinationTitleText}>{this.state.destName}</Text>
              <View style={styles.cancelIcon}>
                <Icon
                    size={18}
                    name='close'
                    type='material'
                    color={NapColors.subtleBlue}
                    onPress={() => this.rejectSelection()}/>
              </View>
              
            </View>
            <View>
              <Text style={styles.destinationSubtitleText}>{this.state.destAddress}</Text>
            </View>
              
            </> }
        </View>

    </View>
    )
  }

  //======================================= RENDER =================================

  setSelectorState = () => {
    return this.state.destLatitude !== null ? this.DisplayView() : this.CreateView()
  }

  render() {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <MapContainer
          currentLatitude={this.state.currentLatitude}
          currentLongitude={this.state.currentLongitude}
          destLatitude={this.state.destLatitude}
          destLongitude={this.state.destLongitude}
          routeCoords={this.state.routeCoords}
          x={this.state.x}
        />
        {this.setSelectorState()}
      </View>

    )      
    }
}

export default TripContainer

AppRegistry.registerComponent('CityNapper', () => TripContainer);

