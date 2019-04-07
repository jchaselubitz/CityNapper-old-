import React, { Component } from 'react';
import { Boundary } from 'react-native-boundary'
import * as Polyline from '@mapbox/polyline'

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.setState({
        currentLatitude: position.coords.latitude,
        currentLongitude: position.coords.longitude,
        error: null,
        // selectedViewContainer: this.lastSelectedViewContainer()
      })
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  )
}


export {
  getCurrentPosition
}