import React, { Component } from 'react';
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { SearchBar, ListItem} from 'react-native-elements';
import {AppRegistry, KeyboardAvoidingView, View, StyleSheet, FlatList} from 'react-native';

export default class SearchComponent extends Component {
  state = {
    searchText: '',
    searchResults: [],
    error: null
  }

  searchRegion = {
    latitude: !!this.props.currentLatitude ? this.props.currentLatitude : 0,
    longitude: !!this.props.currentLongitude ? this.props.currentLongitude : 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1
  };
  
    setSearchText = (text) => {
      this.setState({
        searchText: text
      }, this.placeSearch(this.state.searchText))
    }
    
    placeSearch = (searchText) => {
      RNReverseGeocode.searchForLocations(
        searchText,
        this.searchRegion,
        (err, results) => {
          this.setState({
            error: err,
            searchResults: this.state.searchText !== "" ? results : []
          });
        }
      );
    }
  
   render () {
     return (
       <View>
        <SearchBar        
          placeholder="Where are you going?" 
          lightTheme
          round={true}
          // inputStyle={styles.searchInput} //STYLE
          onClear={() => this.placeSearch('')}         
          onChangeText={text => this.setSearchText(text)}
          value={this.state.searchText}
          autoCorrect={false}             
        />    
        <FlatList 
            data={this.state.searchResults} 
            renderItem={({item}) => 
              <ListItem 
                title={item.name, item.address}
                onPress={() => this.props.setTempDestinationLocation(item)}
                
              />} 
            />
        </View>
     )
   }


}

AppRegistry.registerComponent('CityNapper', () => SearchComponent);