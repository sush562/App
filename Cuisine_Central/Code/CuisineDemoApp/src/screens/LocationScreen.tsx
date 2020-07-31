import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  locationUpdateAction,
  restaurantListParamAction,
  filterUpdateAction,
} from '../store/actioncreator';
import Geolocation from '@react-native-community/geolocation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {SearchAreaQuery, SearchAreaLatLng} from '../service/LocationService';
import {
  AreaSearchResult,
  LocationItem,
  RestaurantListSearchParams,
  FilterParams,
} from '../interfaces';
import {StackActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Appbar, Snackbar, Divider} from 'react-native-paper';
import {INITIAL_STATE as FILTER_INITIAL_STATE} from '../store/reducers/FilterReducer';
import {WaveIndicator} from 'react-native-indicators';
import {Colors} from '../utils/Colors';
import {
  baseStyle,
  LocationScreenStyle,
  screenMiddleStyle,
} from '../style/BaseStyleSheet';
import {
  displayAlert,
  isNetworkAvailable,
  displayInternetError,
} from '../utils/Util';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {HOME_SCREEN_NAME} from '../utils/Data';

interface Props {
  updateLocationInRedux: Function;
  navigation: any;
  updateRestaurantListSearchParamsInRedux: Function;
  updateFilterParamsInRedux: Function;
  route: any;
  filterItem: FilterParams;
}

interface State {
  isAreaSearching: boolean;
  isGPSLocationSearching: boolean;
  searchAreaText: string;
  searchAreaResult: AreaSearchResult[];
  isSnackBarVisible: boolean;
}

class LocationScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAreaSearching: false,
      searchAreaText: '',
      searchAreaResult: [],
      isGPSLocationSearching: false,
      isSnackBarVisible: false,
    };
    this.searchArea = this.searchArea.bind(this);
    this.fetchLocationUsingGPS = this.fetchLocationUsingGPS.bind(this);
    this.updateReduxItems = this.updateReduxItems.bind(this);
  }

  fetchLocationUsingGPS() {
    this.setState({
      isGPSLocationSearching: true,
      searchAreaText: '',
      isSnackBarVisible: true,
    });
    Geolocation.getCurrentPosition(
      (info) => {
        SearchAreaLatLng(info.coords.latitude, info.coords.longitude)
          .then((res) => {
            this.updateReduxItems(res);
          })
          .catch((e) => {
            this.setState({
              isGPSLocationSearching: false,
              isSnackBarVisible: false,
            });
            console.log(e);
          });
      },
      (error) => {
        this.setState({
          isGPSLocationSearching: false,
          isSnackBarVisible: false,
        });
        if (error.code === 2) {
          Alert.alert('Error', 'Please enable GPS from device settings.');
        }
      },
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 1000},
    );
  }

  checkGpsPermission() {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      switch (result) {
        case RESULTS.DENIED:
          request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
            switch (result) {
              case RESULTS.DENIED:
                break;
              case RESULTS.GRANTED:
                this.fetchLocationUsingGPS();
                break;
              case RESULTS.BLOCKED:
                this.locationBlockedAlert();
                break;
            }
          });
          break;
        case RESULTS.GRANTED:
          this.fetchLocationUsingGPS();
          break;
        case RESULTS.BLOCKED:
          this.locationBlockedAlert();
          break;
      }
    });
  }

  locationBlockedAlert() {
    Alert.alert(
      'Location Access Blocked',
      'Location access has been permanently blocked. Please enable them from app settings.',
      [{text: 'OK'}],
      {cancelable: false},
    );
  }

  updateReduxItems(locationItem: LocationItem) {
    this.props.updateLocationInRedux(locationItem);
    if (this.props.route.params.isFromHomePage) {
      this.props.updateFilterParamsInRedux(FILTER_INITIAL_STATE);
    }
    this.props.updateRestaurantListSearchParamsInRedux({
      lat: locationItem.latitude,
      lon: locationItem.longitude,
      count: 20,
      start: 0,
      radius: 1000,
    });
    if (this.props.route.params.isFromHomePage) {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: HOME_SCREEN_NAME}],
      });
    } else {
      this.props.navigation.dispatch(StackActions.replace(HOME_SCREEN_NAME));
    }
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <Appbar.Header
          accessibilityStates=""
          style={baseStyle.toolbarBaseStyle}>
          {this.props.route.params.isFromHomePage && (
            <Appbar.BackAction
              accessibilityStates=""
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          )}
          <Appbar.Content
            accessibilityStates=""
            title="Location"
            titleStyle={baseStyle.textBaseStyle}
          />
          <Appbar.Action
            accessibilityStates=""
            icon={() => <MaterialIcon name="my-location" size={25} />}
            onPress={() => {
              this.checkGpsPermission();
            }}
          />
        </Appbar.Header>
        <Searchbar
          editable={!this.state.isGPSLocationSearching}
          accessibilityStates=""
          placeholder="Type Search Area Name..."
          onChangeText={(text) => {
            this.setState({searchAreaText: text});
            this.searchArea(text);
          }}
          style={LocationScreenStyle.searchBarStyle}
          value={this.state.searchAreaText}
          icon={() => <Icon name="map-search-outline" size={20} />}
        />
        {(this.state.isAreaSearching || this.state.isGPSLocationSearching) && (
          <WaveIndicator
            color={Colors.primary}
            style={screenMiddleStyle.middleStyle}
          />
        )}
        <Snackbar
          accessibilityStates=""
          visible={this.state.isSnackBarVisible}
          onDismiss={() => {
            this.setState({isSnackBarVisible: false});
          }}
          duration={Snackbar.DURATION_SHORT}
          action={{
            label: 'Close',
            onPress: () => {
              this.setState({isSnackBarVisible: false});
            },
          }}>
          Fetching your current location...
        </Snackbar>
        <FlatList
          style={{margin: 10}}
          data={this.state.searchAreaResult}
          ItemSeparatorComponent={() => {
            return <Divider accessibilityStates="" />;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  this.updateReduxItems(item);
                }}>
                <View style={LocationScreenStyle.itemViewStyle}>
                  <Text style={LocationScreenStyle.itemTextStyle}>
                    {item.title + `, ` + item.country_name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.city_id.toString()}
        />
      </View>
    );
  }

  interval: number = 0;
  searchArea(text: string) {
    if (text.length > 3) {
      if (this.interval > 0) clearInterval(this.interval);
      if (isNetworkAvailable()) {
        this.setState({isAreaSearching: true, searchAreaResult: []});
        this.interval = setTimeout(() => {
          SearchAreaQuery(text)
            .then((list) => {
              this.setState({searchAreaResult: list, isAreaSearching: false});
              this.interval = 0;
              if (list.length === 0) {
                displayAlert(
                  'Error',
                  'No results found. Please try with another search term.',
                );
              }
            })
            .catch((e) => {
              console.log(e);
              this.interval = 0;
              this.setState({isAreaSearching: false});
            });
        }, 1000);
      } else {
        displayInternetError();
      }
    } else {
      if (this.interval > 0) {
        clearInterval(this.interval);
        this.interval = 0;
        if (this.state.isAreaSearching) {
          this.setState({isAreaSearching: false});
        }
      }
      this.setState({searchAreaResult: []});
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    locationItem: state.locationReducer,
    filterItem: state.filterReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateLocationInRedux(item: LocationItem) {
      dispatch(locationUpdateAction(item));
    },
    updateRestaurantListSearchParamsInRedux(item: RestaurantListSearchParams) {
      dispatch(restaurantListParamAction(item));
    },
    updateFilterParamsInRedux(item: FilterParams) {
      dispatch(filterUpdateAction(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen);
