import React, { Component } from 'react';
import Keys from '../helpers/Keys'
import * as Polyline from '@mapbox/polyline'
import MapContainer from './MapContainer'
import { Icon} from 'react-native-elements';
import {AppRegistry, Vibration, View, Text, TouchableOpacity} from 'react-native';
import Boundary, {Events} from 'react-native-boundary';
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const PATTERN = [ 100, 50]

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
  
  rejectSelection = () => {
    this.setState({ 
      destLatitude: null,
      destLongitude: null,
      destName: "-",
      destAddress: '',
      routeCoords: [],
     });
  }

  setNap = () => {
    this.setBoundary()
    this.props.navigation.navigate('Nap', {
      destName: this.state.destName,
      endNap: this.endNapAndDropBoundary
    })
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
      .then(() => console.log("boundary set"))
      .catch(e => console.error("error :(", e));
   
    Boundary.on(Events.ENTER, id => {
      this.startVibrationFunction()
      alert(`Wake up! you are at ${id}!!`)
      
    });
  }

  endNapAndDropBoundary = () => {
    if (id !== "-")
    alert("Location Removed")
    this.stopVibrationFunction()
    Boundary.remove()
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
                  color='#5C6174'
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
        <TouchableOpacity style={styles.buttonFavorite} >
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
          <TouchableOpacity
            style={styles.cancelNapButton}
            onPress={() => this.rejectSelection()}>
            <Text style={styles.cancelNapText}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStartNap}
            onPress={() => this.acceptSelection()}>
            <Text style={styles.buttonNapText}>Start Nap</Text>
        </TouchableOpacity>
        <View style={styles.tripDisplayCard}>
          {this.state.destName === "-" ? 
            "The name for this destination is missing!" 
            : 
            <>
           <View>
            <Text style={styles.destinationTitleText}>{this.state.destName}</Text>
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

