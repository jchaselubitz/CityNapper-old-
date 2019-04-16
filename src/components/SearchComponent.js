import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import { Icon, ListItem} from 'react-native-elements';
import {AppRegistry, View, FlatList, TextInput, Text} from 'react-native';
import { Divider } from 'react-native-elements';

const { getStyles, getColors } = StyleHelper

class SearchComponent extends Component {

   render () {
     
     return (
       
      <View>
       <View>
       <View style={getStyles().modalHeader}/>
          <TextInput
            style={getStyles().searchBar}
            placeholder="Where are you going?"
            placeholderTextColor={getColors().placeHolderText}
            onChangeText={text => this.props.setSearchText(text)}
            autoCorrect={false}    
          />
        </View>
        <View style={getStyles().pulldownEr} >
          <View style={getStyles().pulldownErLine1}/>
          <View style={getStyles().pulldownErLine2}/>
        </View>
        <View style={getStyles().flatList}>
        
        <FlatList 
          data={this.props.presentRecent()} 
          extraData={this.props.userFavorites}
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
                containerStyle={getStyles().listItem}
                titleStyle={getStyles().listItem}
                subtitleStyle={getStyles().listItem}
                onPress={() => this.props.handleSelection(item)}
              />
            </View>
              <View style={getStyles().listIcon}>
              {this.props.isFavorite(item) ? 
              <Icon
                  name={'favorite'}
                  type='material'
                  color={getColors().listIcon}
                  onPress={() => this.props.addRemoveFavorite(item)}
                />
                : 
              <Icon
                  name={'favorite-border'}
                  type='material'
                  color={getColors().listIcon}
                  onPress={() => this.props.addRemoveFavorite(item)}
                />
              }
              </View>
          </View>
            <Divider style={getStyles().listDivider} />
            </>
          } 
          keyExtractor={item => item.address} 
          
          />
          </View>
          <View>
          </View>
        </View>
        
     )
   }
}

export default SearchComponent

AppRegistry.registerComponent('CityNapper', () => SearchComponent);