import React, { Component } from 'react';
import {AppRegistry, } from 'react-native';

// This shows the running nap
    // needs ability to cancel boundary 
// End Nap
    // Needs ability to stop alarm


export default class NapContainer extends Component {
  state = {
    
  }

   render () {
     return (
       <RunningNapComponent /> 
       <AlarmComponent />
     )
   }


}

AppRegistry.registerComponent('CityNapper', () => NapContainer);