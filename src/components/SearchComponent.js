import React, { Component } from 'react';
import StylesHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { SearchBar, ListItem} from 'react-native-elements';
import {AppRegistry, View, Button, FlatList} from 'react-native';
import { Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
const styles = StylesHelper.styles

// const { navigation } = this.props.navigation;
// const currentLatitude = navigation.getParam('currentLatitude');
// const currentLongitude = navigation.getParam('currentLongitude');

//GET ACCESS TO CONTACTS

class SearchComponent extends Component {
  // static navigationOptions = { title: 'SearchComponent' }
  state = {
    searchText: '',
    searchResults: [],
    error: null
  }

  searchRegion = () => ({
    latitude: !!currentLatitude ? currentLatitude : 0,
    longitude: !!currentLongitude ? currentLongitude : 0,
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
                onPress={(event) => handleSelection(item)}
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