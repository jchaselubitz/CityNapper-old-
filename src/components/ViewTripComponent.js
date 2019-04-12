import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class ViewTripComponent extends Component {
  render() { 
    return (
      <View style={styles.tripSelectionContainer}>
          {this.props.napping === false
        ?   
          <TouchableOpacity
            style={styles.buttonStartNap}
            onPress={() => this.props.napStarter()}>
            <Text style={styles.buttonNapText}>Start Nap</Text>
          </TouchableOpacity>
        :
          <TouchableOpacity
            style={styles.buttonStartNap}
            onPress={() => this.props.goToNap()}>
            <Text style={styles.buttonNapText}>Resume Nap</Text>
          </TouchableOpacity>
        }
          <View style={styles.tripDisplayCard}>
          {this.props.destName === "-" ? 
            "The name for this destination is missing!" 
            : 
            <>
            <View style={{
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
               }}>
              <Text style={styles.destinationTitleText}>{this.props.destName}</Text>
              <View style={styles.cancelIcon}>
                <Icon
                    size={18}
                    name='close'
                    type='material'
                    color={NapColors.subtleBlue}
                    onPress={() => this.props.rejectSelection()}/>
              </View>
              
            </View>
            <View>
              <Text style={styles.destinationSubtitleText}>{this.props.destAddress}</Text>
            </View>
              
            </> }
        </View>

    </View>
    )
  }
}
 
export default ViewTripComponent;

AppRegistry.registerComponent('CityNapper', () => ViewTripComponent);