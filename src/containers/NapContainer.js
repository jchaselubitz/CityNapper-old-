import React, { Component } from 'react';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import MapComponent from '../components/MapComponent'
import StyleHelper from '../helpers/StyleHelper'
const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

export default class NapContainer extends Component {
  static navigationOptions = { header: null }

  state = {
    
  }

   render () {
    const { navigation } = this.props;
    const destName = this.props.screenProps.destName
    const destAddress = this.props.screenProps.destAddress
    const endNap = this.props.screenProps.endNap
    const currentLongitude = this.props.screenProps.currentLongitude
    const currentLatitude = this.props.screenProps.currentLatitude
    const destLatitude = this.props.screenProps.destLatitude
    const destLongitude = this.props.screenProps.destLongitude
    const routeCoords = this.props.screenProps.routeCoords
    const x = this.props.screenProps.x

    handleClick = () => {
      endNap()
      
      navigation.goBack()

    }
     return (
       <>
        <MapComponent
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          destLatitude={destLatitude}
          destLongitude={destLongitude}
          routeCoords={routeCoords}
          x={x}
        />
      <View style={styles.napContainer}>
        <TouchableOpacity
          style={styles.endNapButton} 
          onPress={() => handleClick()}
          >
          <Text style={styles.endNapText}>End Nap</Text>
        </TouchableOpacity>
        <View style={styles.tripDisplayCard}>
          <Text style={styles.destinationTitleText}>{destName}</Text>
          <Text style={styles.destinationSubtitleText}>{destAddress}</Text>
          <Text style={styles.destinationTitleText}>Blah Blah Blah</Text>
          <Text style={styles.destinationSubtitleText}>Some super cool features</Text>
        </View>
      </View>
      </>
     )
   }

}

AppRegistry.registerComponent('CityNapper', () => NapContainer);

