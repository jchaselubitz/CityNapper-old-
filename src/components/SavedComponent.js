import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import { Icon, ListItem } from 'react-native-elements';
import { AppRegistry, View, FlatList, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';

const styles = StyleHelper.styles
const NapColors = StyleHelper.NapColors

class SavedComponent extends Component {
  
   render () {
     
     return (
       
      <View>
       <View>
       <View style={styles.modalHeader}/>
          <TextInput
            style={styles.searchBar}
            placeholder="Search for a location to save."
            placeholderTextColor={NapColors.primaryBlue}
            onChangeText={text => this.props.setSearchText(text)}
            autoCorrect={false}    
          />
        </View>

        <View style={styles.pulldownEr} >
          <View style={styles.pulldownErLine1}/>
          <View style={styles.pulldownErLine2}/>
        </View>

        <View style={styles.flatList}>
        <FlatList 
          data={this.props.searchResults} 
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
                onPress={() => this.props.handleFavoriteSelection(item)}
              />
            </View>
              <View style={styles.listIcon}>
              <Icon
                  name={'add'}
                  type='material'
                  color={NapColors.primaryBlue}
                  onPress={() => this.props.handleFavoriteSelection(item)}
                />
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

export default SavedComponent

AppRegistry.registerComponent('CityNapper', () => SavedComponent);