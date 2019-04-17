import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'
import TransitButtonComponent from './TransitButtonComponent';

const { getStyles, getColors } = StyleHelper

class ViewTripComponent extends Component {
  
  

  render() { 
    return (
      <View style={getStyles().tripSelectionContainer}>
          {this.props.napping === false
        ?   
          <TouchableOpacity
            style={getStyles().buttonStartNap}
            onPress={() => this.props.napStarter()}>
            <Text style={getStyles().buttonNapText}>Start Nap</Text>
          </TouchableOpacity>
        :
          <TouchableOpacity
            style={getStyles().buttonStartNap}
            onPress={() => this.props.goToNap()}>
            <Text style={getStyles().buttonNapText}>Resume Nap</Text>
          </TouchableOpacity>
        }
          <TouchableOpacity
            style={getStyles().cancelButton}
            onPress={() => this.props.rejectSelection()}>
             <Icon
                    size={24}
                    name='close'
                    type='material'
                    color={getColors().cancelRed}
                   />
          </TouchableOpacity>
          <View style={{
             position: 'absolute',
             top: 24,
             left: 60,
             zIndex: 3
          }}>
            <TouchableOpacity
              style={getStyles().favoriteButton}
              onPress={() => this.props.addRemoveFavorite(this.props.destLocation)}>
              {this.props.isFavorite(this.props.destLocation)
              ?
                <Icon
                    size={24}
                    name='favorite'
                    type='material'
                    color={getColors().listIcon}
                    />
              :
                <Icon
                      size={24}
                      name='favorite-border'
                      type='material'
                      color={getColors().listIcon}
                    />
                      
              }
          </TouchableOpacity>
          </View>
          <View style={getStyles().tripDisplayCard}>
          {this.props.destName === "-" ? 
            "The name for this destination is missing!" 
            : 
            <>
            <View style={{
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',
         
               }}>
              <Text style={getStyles().destinationTitleText}>{this.props.destName}</Text>
              <Text style={getStyles().detailText}>~{this.props.timeToDest}</Text>
            </View>
            <View>
              <Text style={getStyles().destinationSubtitleText}>{this.props.destAddress}</Text>
            </View>
            </> }

            <TransitButtonComponent 
              currentMode={this.props.currentMode}
              changeTransitMode={this.props.changeTransitMode}
            />
        
        </View>

    </View>
    )
  }
}
 
export default ViewTripComponent;

AppRegistry.registerComponent('CityNapper', () => ViewTripComponent);