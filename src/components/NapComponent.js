import React, { Component } from 'react';
import {AppRegistry, View, Text, TouchableOpacity, Button} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'
import air_conditioner from '../media/air_conditioner.mp3'
import crackling_fireplace from '../media/crackling_fireplace.mp3'
import heavy_rain from '../media/heavy_rain.mp3'
import rainforest from '../media/rainforest.mp3'
const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

export default class NapContainer extends Component {
  

  render () {
     return (
      <View style={styles.napContainer}>
        <TouchableOpacity
          style={styles.endNapButton} 
          onPress={() => this.props.handleClick()}
          >
          <Text style={styles.endNapText}>End Nap</Text>
        </TouchableOpacity>
        <View style={styles.tripDisplayCard}>
          <Text style={styles.destinationTitleText}>{this.props.destName}</Text>
          <Text style={styles.destinationSubtitleText}>{this.props.destAddress}</Text>
          <Text style={styles.destinationTitleText}>Play some sweet jamz</Text>
          <Button onPress={() => this.props.clickVideo(air_conditioner)} title='Air conditioner'/>
          <Button onPress={() => this.props.clickVideo(crackling_fireplace)} title='Fireplace'/>
          <Button onPress={() => this.props.clickVideo(heavy_rain)} title='Heavy rain'/>
          <Button onPress={() => this.props.clickVideo(rainforest)} title='Rainforest'/>
          <Button onPress={() => this.props.playPause()} title='Play/Pause'/>
           
           {this.props.sleepSound()}
         
        </View>
      </View>
     )
   }

}

AppRegistry.registerComponent('CityNapper', () => NapContainer);

