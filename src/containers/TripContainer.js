import React, { Component } from 'react';
import MapContainer from './MapContainer'
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class TripContainer extends Component {
  static navigationOptions = { header: null }


  render() {
    
    const currentLatitude = this.props.screenProps.currentLatitude
    const currentLongitude = this.props.screenProps.currentLongitude
    const destLatitude = this.props.screenProps.destLatitude
    const destLongitude = this.props.screenProps.destLongitude
    const destName = this.props.screenProps.destName
    const destAddress = this.props.screenProps.destAddress
    const startVibrationFunction = this.props.screenProps.startVibrationFunction
    const startNap = this.props.screenProps.startNap
    const endNap = this.props.screenProps.endNap
    const napping = this.props.screenProps.napping
    const routeCoords = this.props.screenProps.routeCoords
    const x = this.props.screenProps.x
    const dropBoundary = this.props.screenProps.dropBoundary
    const clearDestinationSelection = this.props.screenProps.clearDestinationSelection


    //============================= Nap Manager =============================

    napStarter = () => {
      startNap()
      goToNap()
    }

    goToNap = () => {
      this.props.navigation.navigate('Nap')
    }

    rejectSelection = () => {
      dropBoundary()
      clearDestinationSelection(() => this.props.navigation.navigate('Search'))

    }

//============================= View Controller =============================
    CreateView = () => {
      return (
        <View style={styles.tripSelectionContainer}>
         
          <TouchableOpacity
          style={styles.buttonSearch}
          onPress={() => this.props.navigation.navigate('Search')}>
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
            onPress={() => startVibrationFunction()}
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
            {napping === false
          ?   
            <TouchableOpacity
              style={styles.buttonStartNap}
              onPress={() => napStarter()}>
              <Text style={styles.buttonNapText}>Start Nap</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity
              style={styles.buttonStartNap}
              onPress={() => goToNap()}>
              <Text style={styles.buttonNapText}>Resume Nap</Text>
            </TouchableOpacity>
          }
            <View style={styles.tripDisplayCard}>
            {destName === "-" ? 
              "The name for this destination is missing!" 
              : 
              <>
              <View style={{
                 flexDirection: 'row',
                 justifyContent: 'flex-start',
                 alignItems: 'center',
                 }}>
                <Text style={styles.destinationTitleText}>{destName}</Text>
                <View style={styles.cancelIcon}>
                  <Icon
                      size={18}
                      name='close'
                      type='material'
                      color={NapColors.subtleBlue}
                      onPress={() => rejectSelection()}/>
                </View>
                
              </View>
              <View>
                <Text style={styles.destinationSubtitleText}>{destAddress}</Text>
              </View>
                
              </> }
          </View>
  
      </View>
      )
    }
  
    //======================================= RENDER =================================
  
    setSelectorState = () => {
      return destLatitude !== null ? DisplayView() : CreateView()
    }
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <MapContainer
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          destLatitude={destLatitude}
          destLongitude={destLongitude}
          routeCoords={routeCoords}
          x={x}
        />
        {setSelectorState()}
      </View>

    )      
    }
}

export default TripContainer

AppRegistry.registerComponent('CityNapper', () => TripContainer);

