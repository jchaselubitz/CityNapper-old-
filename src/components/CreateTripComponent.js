import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import {AppRegistry, View, Text, TouchableOpacity} from 'react-native';
import StyleHelper from '../helpers/StyleHelper'

const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class CreateTripComponent extends Component {
  render() { 

  handleWorkHomeSave = (targetButton, label) => {
    if (targetButton !== null) {
      this.props.setDestinationLocation(targetButton)
    } else {
      this.props.navigation.navigate('Saved', {label})
    }
  }

  presentFavoriteButtons = () => {
    return this.props.userFavorites.map(favorite => 
    <TouchableOpacity 
      onPress={() => this.props.setDestinationLocation(favorite.item)} 
      style={styles.buttonFavorite} >
    <View style={styles.buttonContainer}>
        <View style={styles.listIcon}>
          <Icon
              name='favorite'
              type='material'
              color='white'
            />
          </View>

      <Text style={styles.buttonFavoriteText}>
      {favorite.item.name}
      </Text>
  
        <TouchableOpacity onPress={() => this.props.addRemoveFavorite(favorite)} >
        <View style={styles.listIcon}>
          <Icon
              name='close'
              type='material'
              color='lightgrey'
              size={18}
            />
          </View>
          </TouchableOpacity>
      </View>
    </TouchableOpacity>)
  }

    
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
  {/* +++++++++++++++++++++HOME+++++++++++++++++++++++++ */}
      <View style={styles.tripSelectionCard}>
        <TouchableOpacity 
          onPress={() => handleWorkHomeSave(this.props.home, "home")} 
          style={styles.buttonFavorite} >
        <View style={styles.buttonContainer}>
            <View style={styles.listIcon}>
              <Icon
                  name='home'
                  type='material'
                  color='white'
                />
              </View>
          <Text style={styles.buttonFavoriteText}>Home stop</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Saved', {label: 'home'})} >
        <View style={styles.listIcon}>
          <Icon
              name='edit'
              type='material'
              color='lightgrey'
              size={18}
            />
          </View>
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
  {/* +++++++++++++++++++++WORK+++++++++++++++++++++++++ */}
        <TouchableOpacity 
          onPress={() => handleWorkHomeSave(this.props.work, "work")} 
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Saved', {label: 'work'})} >
        <View style={styles.listIcon}>
          <Icon
              name='edit'
              type='material'
              color='lightgrey'
              size={18}
            />
          </View>
          </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {presentFavoriteButtons()}
      </View>

    </View>
    )
  }
}
 
export default CreateTripComponent;

AppRegistry.registerComponent('CityNapper', () => CreateTripComponent);