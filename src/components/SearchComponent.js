import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { Icon, ListItem, colors} from 'react-native-elements';
import {AppRegistry, View, FlatList, TextInput} from 'react-native';
import { Divider } from 'react-native-elements';


const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class SearchComponent extends Component {
  static navigationOptions = { header: null }

  state = {
    searchText: '',
    searchResults: [],
    error: null,
  }

  
   render () {

    const { navigation } = this.props;
    const currentLatitude = navigation.getParam('currentLatitude');
    const currentLongitude = navigation.getParam('currentLongitude');
    const setDestinationLocation = navigation.getParam('setDestinationLocation')
    const userFavorites = navigation.getParam('userFavorites')
    const addRemoveFavorite = navigation.getParam('addRemoveFavorite')
    

    sendToAddRemoveFavorites = (item) => {
      locationObject = {item, id: `${item.location.latitude},${item.location.longitude}`}
      addRemoveFavorite(locationObject)
    }

    favoriteIcon = (item) => {
      locationObject = {item, id: `${item.location.latitude},${item.location.longitude}`}
      return userFavorites.includes(locationObject) 
      // return userFavorites.find((favorite) => favorite.id === locationObject.id) 
      ?
      'favorite'
      :
      'favorite-border'
    }

    searchRegion = () => ({
      latitude: !!currentLatitude ? currentLatitude : 0,
      longitude: !!currentLongitude ? currentLongitude : 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });

    searchFilter = () => {
      //limit search based on custom geofence
    }

    setSearchText = (text) => {
      this.setState({
        searchText: text
      }, () => placeSearch(this.state.searchText))
    }
    
    placeSearch = (searchText) => {
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

    handleSelection = (item) => {
      setDestinationLocation(item)
      navigation.navigate('Trip')
    }

     return (
       
        
      <View>
       <View>
       <View style={styles.modalHeader}/>
          <TextInput
            style={styles.searchBar}
            placeholder="Where are you going?"
            placeholderTextColor={NapColors.primaryBlue}
            onChangeText={text => setSearchText(text)}
            autoCorrect={false}    
          />
        </View>
        <View style={styles.flatList}>
        <FlatList 
          data={this.state.searchResults} 
          keyboardShouldPersistTaps="always"
          renderItem={({item}) => 
          <>
          <View style={{
            flex: 10,
            flexDirection: 'row',
            // marginLeft: 8
          }}>
            
            <View style={{
              flex: 9
            }}>
              <ListItem
                title={item.name}
                subtitle={item.address}
                onPress={() => handleSelection(item)}
              />
            </View>
              <View style={styles.listIcon}>
              
              <Icon
                  name={favoriteIcon(item)}
                  type='material'
                  color={NapColors.primaryBlue}
                  onPress={() => sendToAddRemoveFavorites(item)}
                />
              </View>
          </View>
            <Divider style={styles.listDivider} />
            </>
          } 
          keyExtractor={item => item.address} 
          
          />
          </View>
        </View>
        
     )
   }
}

export default SearchComponent

AppRegistry.registerComponent('CityNapper', () => SearchComponent);