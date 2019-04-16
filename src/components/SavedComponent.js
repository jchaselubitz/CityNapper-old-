import React, { Component } from 'react';
import StyleHelper from '../helpers/StyleHelper'
import { Icon, ListItem } from 'react-native-elements';
import { AppRegistry, View, FlatList, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';

const { getStyles, getColors } = StyleHelper

class SavedComponent extends Component {
  
   render () {
     
     return (
       
      <View>
       <View>
       <View style={getStyles().modalHeader}/>
          <TextInput
            style={getStyles().searchBar}
            placeholder="Search for a location to save."
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
                onPress={() => this.props.handleFavoriteSelection(item)}
              />
            </View>
              <View style={getStyles().listIcon}>
              <Icon
                  name={'add'}
                  type='material'
                  color={getColors().listIcon}
                  onPress={() => this.props.handleFavoriteSelection(item)}
                />
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

export default SavedComponent

AppRegistry.registerComponent('CityNapper', () => SavedComponent);