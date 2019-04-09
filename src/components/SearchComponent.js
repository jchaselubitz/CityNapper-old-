import React, { Component } from 'react';
import StylesHelper from '../helpers/StyleHelper'
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import { Icon, ListItem} from 'react-native-elements';
import {AppRegistry, View, FlatList, TextInput} from 'react-native';
import { Divider } from 'react-native-elements';

const styles = StylesHelper.styles

class SearchComponent extends Component {
  static navigationOptions = { header: null }

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
       
        
      <View>
       <View>
       <View style={styles.modalHeader}/>
          <TextInput
            style={styles.searchBar}
            placeholder="Where are you going?"
            placeholderTextColor="#5C6174"
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
            marginLeft: 8
          }}>
            <View style={styles.listIcon}>
              <Icon
                  name='marker'
                  type='foundation'
                  color='#5C6174'
                />
              </View>
            <View style={{
              flex: 9
            }}>
              <ListItem
                title={item.name}
                subtitle={item.address}
                onPress={() => handleSelection(item)}
              />
              <Divider
              style={styles.listDivider} />
              </View>

          </View>
            
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