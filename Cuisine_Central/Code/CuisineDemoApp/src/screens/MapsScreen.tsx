import React from 'react';
import {View, StyleSheet, Linking, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {LocationItem} from '../interfaces';
import {MapStyle} from '../utils/MapStyle';
import {MapScreenStyle, baseStyle} from '../style/BaseStyleSheet';
import {IconButton} from 'react-native-paper';
import {Colors} from '../utils/Colors';

interface Props {
  route: any;
  navigation: any;
  locationItem: LocationItem;
}

interface State {
  isMapReady: boolean;
}

class MapsScreen extends React.Component<Props, State> {
  marker: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      isMapReady: false,
    };
    this.onMapLayout = this.onMapLayout.bind(this);
    this.openInMaps = this.openInMaps.bind(this);
  }

  setMarkerRef = (ref: any) => {
    this.marker = ref;
  };

  onMapLayout = () => {
    this.setState({isMapReady: true});
    this.marker.showCallout();
  };

  openInMaps() {
    const latitude: string = this.props.route.params.restlatitude as string;
    const longitude: string = this.props.route.params.restlongitude as string;
    const label: string =
      this.props.route.params.title + this.props.route.params.address;
    const url: string = Platform.select({
      ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    console.log(url);
    Linking.openURL(url);
  }

  render() {
    const lat: number = parseFloat(
      this.props.route.params.restlatitude as string,
    );
    const lon: number = parseFloat(
      this.props.route.params.restlongitude as string,
    );
    const destination = {latitude: lat, longitude: lon};
    console.log('destination:', destination.latitude, destination.longitude);
    return (
      <View style={baseStyle.baseParentViewStyle}>
        <MapView
          cacheEnabled
          provider={PROVIDER_GOOGLE}
          style={MapScreenStyle.map}
          onMapReady={this.onMapLayout}
          showsScale={true}
          loadingEnabled
          showsTraffic
          mapType="standard"
          showsBuildings
          showsMyLocationButton
          customMapStyle={MapStyle}
          showsUserLocation
          showsPointsOfInterest
          region={{
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            ref={this.setMarkerRef}
            coordinate={destination}
            title={this.props.route.params.title}
            description={this.props.route.params.address}
            onCalloutPress={this.openInMaps}
          />
        </MapView>
        <IconButton
          style={{position: 'absolute', top: 10, left: 10}}
          accessibilityStates=""
          size={30}
          icon="keyboard-backspace"
          color={Colors.white}
          onPress={() => this.props.navigation.goBack()}
        />
        <IconButton
          style={{position: 'absolute', top: 10, right: 10}}
          accessibilityStates=""
          size={30}
          icon="google-maps"
          color={Colors.white}
          onPress={this.openInMaps}
        />
      </View>
    );
  }
}

export default MapsScreen;
