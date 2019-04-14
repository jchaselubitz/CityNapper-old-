import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import StyleHelper from '../helpers/StyleHelper'
import MapComponent from '../components/MapComponent'
import NapComponent from '../components/NapComponent'
import Video from 'react-native-video'

const styles = StyleHelper.styles

export default class NapContainer extends Component {
      
  state = {
    paused: true,
    soundFile: null
  }

  playPause = () => {
    this.setState({ paused: !this.state.paused });
  }

  clickVideo = (soundFile) => {
    this.setState({ paused: false })
    this.setState({ soundFile: soundFile },)
}

  sleepSound = () => {
    if (this.state.paused === false) {
      return <Video source= {this.state.soundFile}
      ref={(ref) => {
        this.player = ref
      }}                    
      audioOnly={true}
      repeat={true}
      playInBackground={true}
      ignoreSilentSwitch={'ignore'}
      playWhenInactive={true}

    />
    }
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
       <View style={styles.napScreenContainer}>
          <MapComponent
          currentLatitude={currentLatitude}
          currentLongitude={currentLongitude}
          destLatitude={destLatitude}
          destLongitude={destLongitude}
          routeCoords={routeCoords}
          x={x}
        />
        <NapComponent 
          destName={destName}
          destAddress={destAddress}
          handleClick={handleClick}
          sleepSound={this.sleepSound}
          clickVideo={this.clickVideo}
          playPause={this.playPause}
        />
       </View>
       
     
     )
   }

}

AppRegistry.registerComponent('CityNapper', () => NapContainer);

