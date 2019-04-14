import React, { Component } from 'react';
import MapView from 'react-native-maps'
import StylesHelper from '../helpers/StyleHelper'
import {AppRegistry} from 'react-native';

const styles = StylesHelper.styles

export default class MapComponent extends Component {

   render () {
     return (
      <MapView 
      style={styles.map}
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