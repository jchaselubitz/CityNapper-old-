//HomeScreen
import React, {Component} from 'react';
import TripStack from './src/NavigationStacks'
import {TripContainer} from './src/containers/TripContainer'
import SelectionContainer from './src/containers/SelectionContainer'
import SearchComponent from './src/components/SearchComponent'
import pushNotification from './src/services/pushNotification';
import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';



export default class App extends Component  {

  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(TripStack);
console.disableYellowBox = true;

AppRegistry.registerComponent('CityNapper', () => App);