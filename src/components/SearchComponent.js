import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { Icon, ListItem, colors} from 'react-native-elements';
import {AppRegistry, View, FlatList, TextInput, Text} from 'react-native';
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

  // favoriteIcon = (item) => {
  //   console.log('cute coughing')
  //   return this.props.screenProps.userFavorites.map( l => l.id).includes(`${item.location.latitude},${item.location.longitude}`)
  // }


   render () {
     
    const { navigation } = this.props;
    const currentLatitude = this.props.screenProps.currentLatitude
    const currentLongitude = this.props.screenProps.currentLongitude
    const setDestinationLocation = this.props.screenProps.setDestinationLocation
    const userFavorites = this.props.screenProps.userFavorites
    const addRemoveFavorite = this.props.screenProps.addRemoveFavorite
    

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
          extraData={this.props.screenProps.userFavorites}
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
              {this.props.screenProps.userFavorites.map( l => l.id).includes(`${item.location.latitude},${item.location.longitude}`) ? 
              <Icon
                  name={'favorite'}
                  type='material'
                  color={NapColors.primaryBlue}
                  onPress={() => sendToAddRemoveFavorites(item)}
                />
                : 
              <Icon
                  name={'favorite-border'}
                  type='material'
                  color={NapColors.primaryBlue}
                  onPress={() => sendToAddRemoveFavorites(item)}
                />
              }
              </View>
          </View>
            <Divider style={styles.listDivider} />
            </>
          } 
          keyExtractor={item => item.address} 
          
          />
          </View>
          <View>
            {/* <Text>{userFavorites[0].id}</Text> */}
          </View>
        </View>
        
     )
   }
}

export default SearchComponent

AppRegistry.registerComponent('CityNapper', () => SearchComponent);