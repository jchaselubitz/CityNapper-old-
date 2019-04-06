//HomeScreen
import React, {Component} from 'react';
import TripContainer from './src/containers/TripContainer'
import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';


export default class App extends Component  {

  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(TripContainer);

AppRegistry.registerComponent('CityNapper', () => App);