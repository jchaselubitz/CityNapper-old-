import React, { Component } from 'react';
import {AppRegistry, View, Text, TouchableOpacity, Button} from 'react-native';
import { Icon, FlatList, ListItem } from 'react-native-elements';
import StyleHelper from '../helpers/StyleHelper'
import air_conditioner from '../media/air_conditioner.mp3'
import crackling_fireplace from '../media/crackling_fireplace.mp3'
import heavy_rain from '../media/heavy_rain.mp3'
import rainforest from '../media/rainforest.mp3'

const { getStyles, getColors } = StyleHelper
//Could put this in a music manager

const sounds = [
  {
    name: 'Rainforest',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Ulva_Island_rainforest.jpg',
    subtitle: 'Comforting sounds of rain an birds.',
    sound: rainforest
  },
  {
    name: 'Air Conditioner',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Air_Condition_Unit_Interior_View_USA.jpg/319px-Air_Condition_Unit_Interior_View_USA.jpg',
    subtitle: 'The whitest of white noise.',
    sound: air_conditioner
  },
  {
    name: 'Crackling Fireplace',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Fire_from_brazier.jpg/320px-Fire_from_brazier.jpg',
    subtitle: 'For your coziest commutes.',
    sound: crackling_fireplace
  },
  {
    name: 'Heavy Rain',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Rain_drops_on_window_01_ies.jpg/320px-Rain_drops_on_window_01_ies.jpg',
    subtitle: 'Like Air Conditioner, but wetter.',
    sound: heavy_rain
  },
  
]


export default class NapContainer extends Component {
  
  render () {
     return (
      <View style={getStyles().napContainer}>
      <View style={{
         position: 'absolute',
         top: 24,
         left: 20,
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
        <TouchableOpacity
          style={getStyles().endNapButton} 
          onPress={() => this.props.handleClick()}
          >
          <Text style={getStyles().endNapText}>End Nap</Text>
        </TouchableOpacity>
        <View style={getStyles().tripDisplayCard}>
          <Text style={getStyles().destinationTitleText}>{this.props.destName}</Text>
          <Text style={getStyles().destinationSubtitleText}>{this.props.destAddress}</Text>
        
        <View style={getStyles().divider}/>

          <View>
          {
            sounds.map((s, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: s.avatar_url } }}
                title={s.name}
                subtitle={s.subtitle}
                containerStyle={getStyles().soundItem}
                titleStyle={getStyles().soundItem}
                subtitleStyle={getStyles().soundItem}
                onPress={() => this.props.clickVideo(s.sound)}
              />
            ))
          }
        </View>
        <View>
          {!!this.props.soundFile ? 
          <TouchableOpacity
          style={getStyles().playButton} 
          onPress={() => this.props.playPause()}>
            {this.props.isPaused
              ?
                <Icon
                    size={32}
                    name='play-arrow'
                    type='material'
                    color={getColors().white}
                    />
              :
                <Icon
                      size={32}
                      name='pause'
                      type='material'
                      color={getColors().white}
                    /> 
              }
          </TouchableOpacity>
          :
          null
          }
        </View>

           {this.props.sleepSound()}

        </View>
    </View>
     
     )
   }

}

AppRegistry.registerComponent('CityNapper', () => NapContainer);

