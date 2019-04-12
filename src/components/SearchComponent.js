import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import { Icon, ListItem} from 'react-native-elements';
import {AppRegistry, View, FlatList, TextInput, Text} from 'react-native';
import { Divider } from 'react-native-elements';


const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class SearchComponent extends Component {

   render () {
     
     return (
       
      <View>
       <View>
       <View style={styles.modalHeader}/>
          <TextInput
            style={styles.searchBar}
            placeholder="Where are you going?"
            placeholderTextColor={NapColors.primaryBlue}
            onChangeText={text => this.props.setSearchText(text)}
            autoCorrect={false}    
          />
        </View>
           
        <View style={styles.flatList}>
        
        <FlatList 
          data={this.props.searchResults} 
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
                onPress={() => this.props.handleSelection(item)}
              />
            </View>
              <View style={styles.listIcon}>
              {this.props.favoriteIcon(item) ? 
              <Icon
                  name={'favorite'}
                  type='material'
                  color={NapColors.primaryBlue}
                  onPress={() => this.props.sendToAddRemoveFavorites(item)}
                />
                : 
              <Icon
                  name={'favorite-border'}
                  type='material'
                  color={NapColors.primaryBlue}
                  onPress={() => this.props.sendToAddRemoveFavorites(item)}
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
          </View>
        </View>
        
     )
   }
}

export default SearchComponent

AppRegistry.registerComponent('CityNapper', () => SearchComponent);