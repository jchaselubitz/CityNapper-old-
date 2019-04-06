//HomeScreen
import React, {Component} from 'react';
import TripContainer from './src/containers/TripContainer'
import {AppRegistry} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'

export default class App extends Component  {

  render() {
    return <AppContainer />;
  }
}

//creates the root stack
//could add a higher-level home route
const RootStack = createStackNavigator(
  {
    Trip: TripContainer,
    // Account: Account
  },
  {
    initialRouteName: 'Trip',
  }
);

//turns the stack into a container
const AppContainer = createAppContainer(RootStack);

AppRegistry.registerComponent('CityNapper', () => App);