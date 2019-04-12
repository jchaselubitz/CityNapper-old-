import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { Icon, ListItem, colors} from 'react-native-elements';
import {AppRegistry, View, FlatList, TextInput, Text} from 'react-native';
import { Divider } from 'react-native-elements';


const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class SearchContainer extends Component {
  static navigationOptions = { header: null }

  state = {
    searchText: '',
    searchResults: [],
    error: null,
  }

   render () {
     
    const { navigation } = this.props;
    const currentLatitude = this.props.screenProps.currentLatitude
    const currentLongitude = this.props.screenProps.currentLongitude
    const setDestinationLocation = this.props.screenProps.setDestinationLocation
    const userFavorites = this.props.screenProps.userFavorites
    const addRemoveFavorite = this.props.screenProps.addRemoveFavorite

    const setAsHomeWorkButton = this.props.screenProps.setAsHomeWorkButton
    const label = this.props.navigation.getParam('label')

    const sendToAddRemoveFavorites = (item) => {
      locationObject = {item, id: `${item.location.latitude},${item.location.longitude}`}
      addRemoveFavorite(locationObject)
    }


    const searchRegion = () => ({
      latitude: !!currentLatitude ? currentLatitude : 0,
      longitude: !!currentLongitude ? currentLongitude : 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });

    const searchFilter = () => {
      //limit search based on custom geofence
    }

    
    const setSearchText = (text) => {
      this.setState({
        searchText: text
      }, () => placeSearch(this.state.searchText))
    }
    
    const placeSearch = (searchText) => {
      RNReverseGeocode.searchForLocations(
        searchText,
        searchRegion(),
        (err, results) => {
          this.setState({
            error: err,
            searchResults: this.state.searchText !== "" ? results : []
          });
        }
      );
    }


    const handleSelection = (item) => {
      setDestinationLocation(item)
      navigation.navigate('Trip')
    }

    const favoriteIcon = (item) => {
      return userFavorites.map( l => l.id).includes(`${item.location.latitude},${item.location.longitude}`)
    }

    const setSearchType = () => {
      searchType === 'search'
      ?
      <SearchComponent />
      :
      <SavedComponent />
    }
    
    
     return setSearchType()
       
   }
}

export default SearchContainer

AppRegistry.registerComponent('CityNapper', () => SearchContainer);