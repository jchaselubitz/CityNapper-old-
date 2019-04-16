import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'
import ColorModeToggleComponent from './ColorModeToggleComponent';

const { getStyles, getColors, } = StyleHelper

class CreateTripComponent extends Component {

  render() { 
  handleWorkHomeSave = (targetButton, label) => {
    if (targetButton !== null) {
      this.props.setDestinationLocation(targetButton)
    } else {
      this.props.navigation.navigate('Search', {searchType: 'saved', label: label})
    }
  }

  presentFavoriteButtons = () => {
    return this.props.userFavorites.map(favorite => 
    <TouchableOpacity 
      onPress={() => this.props.setDestinationLocation(favorite.item)} 
      style={getStyles().savedButton} >
    <View style={getStyles().savedButtonContainer}>
        <View style={getStyles().listIcon}>
          <Icon
              name='favorite'
              type='material'
              color={getColors().lightIcon}
            />
          </View>

      <Text style={getStyles().savedButtonText}>
      {favorite.item.name}
      </Text>
  
        <TouchableOpacity onPress={() => this.props.addRemoveFavorite(favorite.item)} >
        <View style={getStyles().modifySavedIcon}>
          <Icon
              name='close'
              type='material'
              color={getColors().lightIcon}
              size={18}
            />
          </View>
          </TouchableOpacity>
      </View>
    </TouchableOpacity>)
  }

    
    return (
      <View style={getStyles().tripSelectionContainer}>
        <TouchableOpacity
        style={getStyles().buttonSearch}
        onPress={() => this.props.navigation.navigate('Search', {searchType: 'search'})}>
        <View style={getStyles().searchButtonContainer}>
        <View style={getStyles().listIcon}>
              <Icon
                  name='search'
                  type='material'
                  color={getColors().placeHolderText}
                />
              </View>
        <Text style={getStyles().searchButtonText}>Where are you going?</Text>
        </View>
      </TouchableOpacity>
  {/* +++++++++++++++++++++HOME+++++++++++++++++++++++++ */}
      <View style={getStyles().tripSelectionCard}>
        <TouchableOpacity 
          onPress={() => handleWorkHomeSave(this.props.home, "home")} 
          style={getStyles().savedButton} >
        <View style={getStyles().savedButtonContainer}>
            <View style={getStyles().listIcon}>
              <Icon
                  name='home'
                  type='material'
                  color={getColors().lightIcon}
                />
              </View>
          <Text style={getStyles().savedButtonText}>Home stop</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {searchType: 'saved', label: 'home'})} >
        <View style={getStyles().modifySavedIcon}>
          <Icon
              name='edit'
              type='material'
              color={getColors().lightIcon}
              size={18}
            />
          </View>
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
  {/* +++++++++++++++++++++WORK+++++++++++++++++++++++++ */}
        <TouchableOpacity 
          onPress={() => handleWorkHomeSave(this.props.work, "work")} 
          style={getStyles().savedButton} >
        <View style={getStyles().savedButtonContainer}>
            <View style={getStyles().listIcon}>
              <Icon
                  name='work'
                  type='material'
                  color={getColors().lightIcon}
                />
              </View>
          <Text style={getStyles().savedButtonText}>Work stop</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search', {searchType: 'saved', label: 'work'})} >
        <View style={getStyles().modifySavedIcon}>
          <Icon
              name='edit'
              type='material'
              color={getColors().lightIcon}
              size={18}
            />
          </View>
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {presentFavoriteButtons()}
        <ColorModeToggleComponent 
          toggleDarkMode={this.props.toggleDarkMode}
          darkMode={this.props.darkMode}
        />
      </View>

    </View>
    )
  }
}
 
export default CreateTripComponent;

AppRegistry.registerComponent('CityNapper', () => CreateTripComponent);