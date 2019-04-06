import React, { Component } from 'react';
import StylesHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { SearchBar, ListItem} from 'react-native-elements';
import {AppRegistry, View, Button, FlatList} from 'react-native';
import { Divider } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation'
const styles = StylesHelper.styles

//GET ACCESS TO CONTACTS

export default class SearchComponent extends Component {
  state = {
    searchText: '',
    searchResults: [],
    error: null
  }

  searchRegion = () => ({
    latitude: !!this.props.currentLatitude ? this.props.currentLatitude : 0,
    longitude: !!this.props.currentLongitude ? this.props.currentLongitude : 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  
    setSearchText = (text) => {
      this.setState({
        searchText: text
      }, () => this.placeSearch(this.state.searchText))
    }
    
    placeSearch = (searchText) => {
      RNReverseGeocode.searchForLocations(
        searchText,
        this.searchRegion(),
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
       <View style={{
         paddingTop: 40
       }}
       >
        <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.push('TripPlanner')}
          />
        <SearchBar        
          placeholder="Where are you going?"
          // containerStyle 
          lightTheme
          round={true}
          inputStyle={styles.searchInput} //STYLE
          onClear={() => this.placeSearch('')}         
          onChangeText={text => this.setSearchText(text)}
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
                onPress={(event) => this.props.handleSelection(item)}
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

AppRegistry.registerComponent('CityNapper', () => SearchComponent);