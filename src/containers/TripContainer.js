import React, { Component } from 'react';
import Keys from '../helpers/Keys'
import * as Polyline from '@mapbox/polyline'
import MapContainer from './MapContainer'
import {AppRegistry, Vibration, View, Text, TouchableOpacity} from 'react-native';
import Boundary, {Events} from 'react-native-boundary';
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const PATTERN = [ 100, 50]

class TripContainer extends Component {
  // static navigationOptions = { title: 'Your Trip' }

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

  acceptSelection = () => {
    this.setNap()
  }

  setNap = () => {
    this.setBoundary()
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
      .then(() => alert(`You have set a location!`))
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


  startVibrationFunction = () => {
    Vibration.vibrate(PATTERN, true)
  }

  stopVibrationFunction = () => {
    Vibration.cancel()
  }

  //=========== Selection ==================



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

  //======================================= VIEWS =================================
  
  CreateView = 0

  DisplayView = 0

  //======================================= RENDER =================================

  setSelectorState = () => {
    return this.state.destLatitude !== null ? DisplayView : CreateView
  }

  render() {
    return (
    <>
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
      
        <View style={styles.tripSelectionContainer}>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => this.props.navigation.navigate('Search', {
              currentLatitude: this.state.currentLatitude,
              currentLongitude: this.state.currentLongitude,
              setDestinationLocation: this.setDestinationLocation,
            })}>
            {/* need to add search icon */}
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
          
          <View style={styles.tripSelectionCard}>
            <TouchableOpacity  style={styles.buttonSecondary} onPress={() => this.acceptSelection()}>
              <Text style={styles.buttonText}>Start Nap</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.dropBoundary(this.props.destName)}>
              <Text style={styles.buttonText}>End Nap</Text>
            </TouchableOpacity>
          </View>

        </View>
          

      </View>
    </>
    )      
    }
}

export default TripContainer

AppRegistry.registerComponent('CityNapper', () => TripContainer);


// DisplayView = 
// <View style={styles.tripSelectionContainer}>
// <View style={{ marginBottom: 30 }}>
// <Text style={{fontSize: 28}}>{this.state.destName !== "-" ? this.state.destName : ""}</Text>
// </View>
// <TouchableOpacity
//   style={styles.buttonSearch}
//   onPress={() => this.props.navigation.navigate('Search', {
//     currentLatitude: this.state.currentLatitude,
//     currentLongitude: this.state.currentLongitude,
//     setDestinationLocation: this.setDestinationLocation,
//   })}>
//   <Text style={styles.searchButtonText}>Search</Text>
// </TouchableOpacity>
// <TouchableOpacity  style={styles.buttonSecondary} onPress={() => this.acceptSelection()}>
//   <Text style={styles.buttonText}>Start Nap</Text>
// </TouchableOpacity>
// <TouchableOpacity style={styles.buttonSecondary} onPress={() => this.dropBoundary(this.props.destName)}>
//   <Text style={styles.buttonText}>End Nap</Text>
// </TouchableOpacity>
// </View>
