import React, { Component } from 'react';
import MapView from 'react-native-maps'
import StyleHelper from '../helpers/StyleHelper'
import {AppRegistry} from 'react-native';

const { getStyles, getColors } = StyleHelper

export default class MapComponent extends Component {

  constructor() {
    super()
    this._mapView = React.createRef()
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.destLatitude !== this.props.destLatitude ||
        prevProps.destLongitude !== this.props.destLongitude ||
        prevProps.currentLatitude !== this.props.currentLatitude ||
        prevProps.currentLongitude !== this.props.currentLongitude ||
        prevProps.routeCoords !== this.props.routeCoords
      ) {
      this._mapView.current.fitToElements(true)
    }
    
  }

 
   render () {
    let styles = getStyles()
     return (
      <MapView 
      ref={this._mapView}
      style={styles.map}
      showsPointsOfInterest={true}
      mapType={styles.selectedMapType}
      region={{
        latitude: !!this.props.currentLatitude ? this.props.currentLatitude : 0,
        longitude: !!this.props.currentLongitude ? this.props.currentLongitude : 0,
        latitudeDelta: .2,
        longitudeDelta: .2 ,
      }}
   
      >
        {!!this.props.currentLatitude && !!this.props.currentLongitude && <MapView.Marker
          coordinate={{"latitude": this.props.currentLatitude,"longitude": this.props.currentLongitude}}
          title={"Your Location"}
        />}

        {!!this.props.destLatitude && !!this.props.destLongitude && <MapView.Marker
          coordinate={{"latitude":this.props.destLatitude,"longitude":this.props.destLongitude}}
          title={"Your Destination"}
        />}
        
      {!!this.props.currentLatitude && !!this.props.currentLongitude && this.props.x === 'true' && 
        <MapView.Polyline
            coordinates={this.props.routeCoords}
            strokeWidth={2}
            strokeColor="red"
        />
      }

        {!!this.props.currentLatitude && !!this.props.currentLongitude && this.props.x == 'error' && 
          <MapView.Polyline
                  coordinates={[
                      {latitude: this.props.currentLatitude, longitude: this.props.currentLatitude},
                      {latitude: this.props.destLatitude, longitude: this.props.destLongitude},
                  ]}
                  strokeWidth={2}
                  strokeColor="red"
          />
        }    
   
    </MapView>

     )
   }
}





AppRegistry.registerComponent('CityNapper', () => MapComponent);