import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, Platform, StyleSheet, Linking} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Appbar, Surface, IconButton, Card, Avatar} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {RestaurantDetailItem, LocationItem} from 'src/interfaces';
import {fetchRestaurantDetail} from '../service/RestaurantService';
import HighLightsDisplay from '../components/HighLightsDisplay';
import {Colors} from '../utils/Colors';
import {PacmanIndicator} from 'react-native-indicators';
import {baseStyle, RestaurantDetailStyle} from '../style/BaseStyleSheet';
import call from 'react-native-phone-call';
import {
  isNetworkAvailable,
  displayInternetError,
  displayAlert,
} from '../utils/Util';
import {
  MAPS_SCREEN_NAME,
  REVIEWS_LIST_SCREEN_NAME,
  WEB_SCREEN_NAME,
} from '../utils/Data';

interface State {
  detail: RestaurantDetailItem;
  highlightList: any[];
  cuisineList: any[];
  distance: number;
  isFetchingDetails: boolean;
  isFetchError: boolean;
  telephone: string;
}
interface Props {
  route: any;
  navigation: any;
  locationItem: LocationItem;
}

const DEFAULT_RestaurantDetailItem: RestaurantDetailItem = {
  id: '',
  name: '',
  featured_image: '../../images/no-image-icon.png',
  user_rating: {
    aggregate_rating: '',
    rating_color: '',
    rating_text: '',
    votes: -1,
  },
  location: {
    address: '',
    locality: '',
    city: '',
    city_id: -1,
    latitude: '',
    longitude: '',
    zipcode: '',
  },
  cuisines: '',
  timings: '',
  average_cost_for_two: -1,
  highlights: [],
  phone_numbers: '',
  currency: 'Rs',
  all_reviews_count: -1,
  url: '',
  deeplink: '',
};

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 88 : 55;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;
console.disableYellowBox = true;

class RestaurantDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.createHighLightList = this.createHighLightList.bind(this);
    this.createCuisineList = this.createCuisineList.bind(this);
    this.getDistanceFromRestaurant = this.getDistanceFromRestaurant.bind(this);
    const {
      id,
      name,
      featured_image,
      user_rating,
    } = this.props.route.params.restaurantval;
    this.state = {
      detail: {
        ...DEFAULT_RestaurantDetailItem,
        id: id,
        name: name,
        featured_image: featured_image,
        user_rating: user_rating,
      },
      isFetchingDetails: false,
      isFetchError: false,
      highlightList: [],
      cuisineList: [],
      distance: -1,
      telephone: '',
    };
  }

  async componentDidMount() {
    this.setState({isFetchingDetails: true});
    const isConnected: boolean | undefined | null = await isNetworkAvailable();
    if (isConnected) {
      fetchRestaurantDetail(this.state.detail.id)
        .then((res) => {
          this.setState({
            isFetchingDetails: false,
            detail: res,
            highlightList: this.createHighLightList(res),
            cuisineList: this.createCuisineList(res),
            telephone: this.getTelephone(res),
          });
        })
        .catch((e) => {
          console.log(e);
          this.setState({isFetchingDetails: false, isFetchError: true});
          displayAlert(
            'Error',
            'There was some error in fetching the details.',
          );
        });
    } else {
      this.setState({isFetchingDetails: false, isFetchError: true});
      displayInternetError();
    }
  }

  renderContent() {
    const detail = this.state.detail;
    return (
      <View style={baseStyle.baseParentViewStyle}>
        <ScrollView
          style={RestaurantDetailStyle.mainScrollStyle}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={true}>
          <Appbar.Header
            accessibilityStates=""
            style={baseStyle.toolbarBaseStyle}>
            <Appbar.BackAction
              accessibilityStates=""
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            <Appbar.Content accessibilityStates="" title="" />
          </Appbar.Header>
          <View style={{marginStart: 10, marginEnd: 10}}>
            <Card accessibilityStates="" style={{elevation: 10}}>
              <View style={{borderRadius: 10}}>
                <Image
                  source={
                    detail.featured_image
                      ? {uri: detail.featured_image}
                      : require('../../images/no-image-icon.png')
                  }
                  style={RestaurantDetailStyle.cardImageStyle}
                />
              </View>
            </Card>
          </View>
          <Text style={RestaurantDetailStyle.titleStyle}>
            {this.state.detail.name}
          </Text>
          {!this.state.isFetchingDetails && !this.state.isFetchError && (
            <View>
              <View style={RestaurantDetailStyle.cuisineListStyle}>
                {this.state.cuisineList}
              </View>
              <View style={RestaurantDetailStyle.ratingStartStyle}>
                {this.getRatingStars(
                  detail.user_rating.aggregate_rating,
                  detail.user_rating.rating_color,
                )}
                <Text style={RestaurantDetailStyle.aggregateRatingStyle}>
                  {detail.user_rating.aggregate_rating}{' '}
                  {detail.all_reviews_count > 0
                    ? `(` + detail.all_reviews_count + ` Reviews)`
                    : ``}
                </Text>
                <MaterialIcon
                  style={{alignSelf: 'center', marginStart: 10}}
                  name="thumb-up"
                  size={15}
                  color={Colors.thumbs_up_yellow}
                />
                <Text style={RestaurantDetailStyle.votesTextStyle}>
                  {detail.user_rating.votes}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, marginStart: 10, marginTop: 10}}>
                  <Text style={[baseStyle.textBaseStyle, {fontWeight: 'bold'}]}>
                    Cost for Two
                  </Text>
                  <Text style={[baseStyle.textBaseStyle]}>
                    {detail.currency + ` ` + detail.average_cost_for_two}
                  </Text>
                </View>
                <View style={{marginTop: 10, flex: 1}}>
                  <Text style={[baseStyle.textBaseStyle, {fontWeight: 'bold'}]}>
                    Open Time
                  </Text>
                  <Text style={[baseStyle.textBaseStyle]}>
                    {detail.timings}
                  </Text>
                </View>
              </View>
              <Surface
                accessibilityStates=""
                style={[
                  RestaurantDetailStyle.defaultSurfaceStyle,
                  {
                    width: '95%',
                    marginStart: 10,
                    marginTop: 10,
                    marginEnd: 10,
                    height: 80,
                    elevation: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(MAPS_SCREEN_NAME, {
                      restlatitude: detail.location.latitude,
                      restlongitude: detail.location.longitude,
                      title: detail.name,
                      imagepath: detail.featured_image,
                      address: detail.location.address,
                    });
                  }}
                  style={{
                    height: '100%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      baseStyle.textBaseStyle,
                      {marginStart: 10, flex: 0.8},
                    ]}>
                    {detail.location.address}
                  </Text>
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../../images/google-maps-icon.png')}
                      style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'center',
                      }}
                    />
                    <Text style={[baseStyle.textBaseStyle, {fontSize: 12}]}>
                      {this.getDistanceFromRestaurant()}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Surface>
              {this.state.highlightList}
            </View>
          )}
          {this.state.isFetchingDetails && (
            <PacmanIndicator color={Colors.primary} style={{marginTop: 50}} />
          )}
        </ScrollView>
        {!this.state.isFetchingDetails && !this.state.isFetchError && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              height: 50,
              width: '100%',
              marginBottom: 10,
              position: 'absolute',
              bottom: 0,
            }}>
            {this.state.telephone !== '' && (
              <IconButton
                color={Colors.primary}
                style={{flex: 1}}
                accessibilityStates=""
                icon="phone"
                onPress={() => {
                  const args = {
                    number: this.state.telephone,
                    prompt: true,
                  };
                  call(args).catch(console.error);
                }}
              />
            )}
            {detail.url !== '' && (
              <IconButton
                color={Colors.primary}
                style={{flex: 1}}
                accessibilityStates=""
                icon="web"
                onPress={() =>
                  this.props.navigation.navigate(WEB_SCREEN_NAME, {
                    url: detail.url,
                    deeplink: detail.deeplink,
                  })
                }
              />
            )}
            <IconButton
              color={Colors.primary}
              style={{flex: 1}}
              accessibilityStates=""
              icon="comment-quote"
              onPress={() =>
                this.props.navigation.navigate(REVIEWS_LIST_SCREEN_NAME, {
                  restaurantId: detail.id,
                })
              }
            />
          </View>
        )}
      </View>
    );
  }

  renderNavBar() {
    return (
      <Appbar.Header accessibilityStates="" style={baseStyle.toolbarBaseStyle}>
        <Appbar.BackAction
          accessibilityStates=""
          onPress={() => this.props.navigation.goBack()}
        />
        <Appbar.Content title={this.state.detail.name} accessibilityStates="" />
      </Appbar.Header>
    );
  }

  createHighLightList(detail: RestaurantDetailItem) {
    let list: any[] = [];
    detail.highlights.forEach((item, index) => {
      if (index % 2 === 0) {
        let val1: string = item;
        let val2: any = null;
        if (index + 1 !== detail.highlights.length) {
          val2 = detail.highlights[index + 1];
        }
        list.push(<HighLightsDisplay item1={val1} item2={val2} />);
      }
    });
    return list;
  }

  createCuisineList(detail: RestaurantDetailItem) {
    let list: any[] = [];
    let splitList: string[] = detail.cuisines.split(',');
    splitList.forEach((element) => {
      list.push(
        <Surface
          style={[
            RestaurantDetailStyle.defaultSurfaceStyle,
            RestaurantDetailStyle.highlightSurfaceStyle,
          ]}
          accessibilityStates="">
          <Text style={[baseStyle.textBaseStyle, {padding: 5}]}>{element}</Text>
        </Surface>,
      );
    });
    return list;
  }

  getTelephone(detail: RestaurantDetailItem) {
    return detail.phone_numbers.split(',')[0].replace(' ', '');
  }

  getDistanceFromRestaurant(): string {
    const haversine = require('haversine');
    const start = {
      latitude: this.props.locationItem.latitude,
      longitude: this.props.locationItem.longitude,
    };
    const end = {
      latitude: this.state.detail.location.latitude,
      longitude: this.state.detail.location.longitude,
    };
    const distance: number = haversine(start, end, {unit: 'km'});
    return Math.round(distance) + ' Kms';
  }

  render() {
    return (
      <View style={baseStyle.baseParentViewStyle}>{this.renderContent()}</View>
    );
  }

  getRatingStars(rating: string, color: string) {
    const ratingFloat = parseFloat(rating);
    const ratingList = [];
    let halfStar: boolean = false;
    let count: number = 0;
    if (ratingFloat <= 0.5) {
      count = 0;
      halfStar = true;
    } else if (ratingFloat <= 1.0) count = 1;
    else if (ratingFloat <= 1.5) {
      count = 1;
      halfStar = true;
    } else if (ratingFloat <= 2.0) count = 2;
    else if (ratingFloat <= 2.5) {
      count = 2;
      halfStar = true;
    } else if (ratingFloat <= 3.0) count = 3;
    else if (ratingFloat <= 3.5) {
      count = 3;
      halfStar = true;
    } else if (ratingFloat <= 4.0) count = 4;
    else if (ratingFloat <= 4.5) {
      count = 4;
      halfStar = true;
    } else if (ratingFloat <= 5.0) count = 5;
    for (var i = 0; i < count; i++) {
      ratingList.push(
        <MaterialIcon name="star" size={20} color={`#` + color} />,
      );
    }
    if (halfStar) {
      ratingList.push(
        <MaterialIcon name="star-half" size={20} color={`#` + color} />,
      );
    }
    return ratingList;
  }
}

const mapStateToProps = (state: any) => {
  return {
    locationItem: state.locationReducer,
  };
};

export default connect(mapStateToProps)(RestaurantDetail);
