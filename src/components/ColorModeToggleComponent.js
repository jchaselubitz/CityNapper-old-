import React, { Component } from 'react';
import {AppRegistry, TouchableOpacity, Text, View } from 'react-native';
import StyleHelper from '../helpers/StyleHelper'

const { getColors, getStyles } = StyleHelper

const ColorModeToggleComponent = (props) => {
  return <TouchableOpacity onPress={() => props.toggleDarkMode()}>
          <View style={getStyles().colorModeToggle} >
            <Text style={getStyles().colorModeToggleText}>{props.darkMode ? "On" : "Off" }</Text>
          </View>
          </TouchableOpacity>
       
}



export default ColorModeToggleComponent

AppRegistry.registerComponent('CityNapper', () => ColorModeToggleComponent);