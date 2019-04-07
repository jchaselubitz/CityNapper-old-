//HomeScreen
import React, {Component} from 'react';
import TripStack from './src/NavigationStacks'
import {TripContainer} from './src/containers/TripContainer'
import SelectionContainer from './src/containers/SelectionContainer'
import SearchComponent from './src/components/SearchComponent'
import {AppRegistry} from 'react-native';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(TripStack);

export default class App extends Component  {

  render() {
    return <AppContainer />;
  }
}



// const TripStack = createStackNavigator(
//   {
//     Trip: {
//       screen: TripContainer
//     },
//     Search: {
//       screen: SearchComponent
//     }
//   },
//   {
//     initialRouteName: 'Trip',
//   }
// );

AppRegistry.registerComponent('CityNapper', () => App);