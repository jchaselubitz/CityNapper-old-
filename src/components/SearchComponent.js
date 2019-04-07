import React, { Component } from 'react';
import StylesHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { SearchBar, ListItem} from 'react-native-elements';
import {AppRegistry, View, Button, FlatList} from 'react-native';
import { Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
const styles = StylesHelper.styles

class SearchComponent extends Component {

  state = {
    searchText: '',
    searchResults: [],
    error: null
  }
  
 
   render () {

    const { navigation } = this.props;
    const currentLatitude = navigation.getParam('currentLatitude');
    const currentLongitude = navigation.getParam('currentLongitude');
    const setDestinationLocation = navigation.getParam('setDestinationLocation')

    searchRegion = () => ({
      latitude: !!currentLatitude ? currentLatitude : 0,
      longitude: !!currentLongitude ? currentLongitude : 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });

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
       
       <View >
        <SearchBar        
          placeholder="Where are you going?"
          // containerStyle 
          lightTheme
          round={true}
          inputStyle={styles.searchInput} //STYLE
          onClear={() => this.placeSearch('')}         
          onChangeText={text => setSearchText(text)}
          value={this.state.searchText}
          autoCorrect={false}             
        />   
          <FlatList 
            data={this.state.searchResults} 
            keyboardShouldPersistTaps="always"
            renderItem={({item}) => 
            <>
              <ListItem
                title={item.name}
                subtitle={item.address}
                onPress={() => handleSelection(item)}
              />
              <Divider
                style={{ 
                  backgroundColor: 'grey',
                  marginLeft: 10,
                  marginRight: 10
               }} />
              </>
            } 
            keyExtractor={item => item.address} 
            
            />
        </View>
     )
   }
}

export default SearchComponent

AppRegistry.registerComponent('CityNapper', () => SearchComponent);