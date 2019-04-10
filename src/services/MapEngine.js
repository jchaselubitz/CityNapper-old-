// import React, { Component } from 'react';
// import { Boundary } from 'react-native-boundary'
// import * as Polyline from '@mapbox/polyline'
// import TripContainer from '../containers/TripContainer'


// const getCurrentLocation = () => {
//   navigator.geolocation.requestAuthorization()
//   navigator.geolocation.getCurrentPosition(
//     (position) => {sendLocationToAppState(position)},
//     (error) => {sendLocationErrorToAppState(error)},
//     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
//   )
// }

// const sendLocationToAppState = (position) => {
//   TripContainer.setCurrentLocation(position)
// }

// const sendLocationErrorToAppState = (error) => {
//   TripContainer.setCurrentLocationError(error)
// }


// export default{
//   getCurrentLocation
// }