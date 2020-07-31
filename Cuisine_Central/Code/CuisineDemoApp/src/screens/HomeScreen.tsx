import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Card, Title, Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  RestaurantListItem,
  RestaurantListSearchParams,
  LocationItem,
} from '../interfaces';
import {restaurantListParamAction} from '../store/actioncreator';
import {FlatList} from 'react-native-gesture-handler';
import {fetchRestaurants} from '../service/RestaurantService';
import {BallIndicator} from 'react-native-indicators';
import {SkypeIndicator} from 'react-native-indicators';
import {Colors} from '../utils/Colors';
import * as BaseStyleSheet from '../style/BaseStyleSheet';
import {
  displayAlert,
  isNetworkAvailable,
  displayInternetError,
} from '../utils/Util';
import {
  LOCATION_SCREEN_NAME,
  RESTAURANT_DETAIL_SCREEN_NAME,
  FILTER_SCREEN_NAME,
} from '../utils/Data';

interface Props {
  navigation: any;
  restaurantListSearchItemProps: RestaurantListSearchParams;
  updateRestaurantListSearchParamsInRedux: Function;
  locationItem: LocationItem;
}

interface State {
  restaurantList: RestaurantListItem[];
}

class HomeScreen extends React.Component<Props, State> {
  private start: number = 0;
  private searchParams: RestaurantListSearchParams;
  private isMoreAvailable: boolean = true;
  private isFetchingInitialList: boolean = false;
  constructor(props: Props) {
    super(props);
    this.state = {
      restaurantList: [],
    };
    this.fetchIntialRestaurantList = this.fetchIntialRestaurantList.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.renderFooterComponent = this.renderFooterComponent.bind(this);
    this.fetchRestaurantList = this.fetchRestaurantList.bind(this);
    this.searchParams = {...this.props.restaurantListSearchItemProps};
  }

  componentDidMount() {
    this.fetchIntialRestaurantList();
  }

  fetchIntialRestaurantList() {
    this.searchParams = {...this.props.restaurantListSearchItemProps};
    this.start = 0;
    this.isFetchingInitialList = true;
    this.isMoreAvailable = true;
    this.setState({});
    setTimeout(() => {
      this.fetchRestaurantList();
    }, 500);
  }

  async fetchRestaurantList() {
    if (this.isMoreAvailable) {
      const isConnected:
        | boolean
        | undefined
        | null = await isNetworkAvailable();
      if (isConnected) {
        this.searchParams.start = this.start;
        fetchRestaurants(this.searchParams)
          .then((list) => {
            this.isFetchingInitialList = false;
            this.start = this.start + 1;
            if (this.start > 9) this.isMoreAvailable = false;
            if (list.length > 0) {
              const newList = [...this.state.restaurantList, ...list];
              this.setState({
                restaurantList: newList,
              });
            } else {
              this.isMoreAvailable = false;
              this.setState({});
            }
          })
          .catch((e) => {
            console.log(e);
            this.isMoreAvailable = false;
            this.isFetchingInitialList = false;
            this.setState({});
            displayAlert('Error', 'Unable to fetch data.');
          });
      } else {
        this.isMoreAvailable = false;
        this.isFetchingInitialList = false;
        this.setState({});
        displayInternetError();
      }
    }
  }

  _renderItem({item, index}: any) {
    return (
      <Card
        accessibilityStates=""
        style={BaseStyleSheet.HomeScreenStyle.cardMainStyle}
        elevation={15}
        onPress={() => {
          console.log(item.name);
          this.props.navigation.navigate(RESTAURANT_DETAIL_SCREEN_NAME, {
            restaurantval: item,
          });
        }}>
        <Card.Cover
          accessibilityStates=""
          style={BaseStyleSheet.HomeScreenStyle.cardCoverStyle}
          source={
            item.featured_image
              ? {uri: item.featured_image, cache: 'force-cache'}
              : require('../../images/no-image-icon.png')
          }
        />
        <Card.Content>
          <Title style={BaseStyleSheet.HomeScreenStyle.cardContentStyle}>
            {item.name}
          </Title>
        </Card.Content>
        <View style={BaseStyleSheet.HomeScreenStyle.ratingMainViewStyle}>
          <View
            style={[
              BaseStyleSheet.HomeScreenStyle.ratingInnerViewStyle,
              {
                backgroundColor: '#' + item.user_rating.rating_color,
              },
            ]}>
            <Text style={BaseStyleSheet.HomeScreenStyle.ratingTextStyle}>
              {item.user_rating.aggregate_rating}
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  renderFooterComponent() {
    if (this.isMoreAvailable && this.start > 0) {
      return (
        <View style={BaseStyleSheet.HomeScreenStyle.footerLoaderStyle}>
          <BallIndicator color={Colors.primary} />
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <SafeAreaView style={BaseStyleSheet.containerStyle.container}>
        <View style={BaseStyleSheet.baseStyle.baseParentViewStyle}>
          {/* <StatusBar backgroundColor={Colors.primary} /> */}
          <Appbar.Header
            accessibilityStates=""
            style={BaseStyleSheet.baseStyle.toolbarBaseStyle}>
            <Appbar.Content
              titleStyle={BaseStyleSheet.baseStyle.textBaseStyle}
              accessibilityStates=""
              title={
                this.props.locationItem.title +
                `, ` +
                this.props.locationItem.city_name
              }
            />
            <Appbar.Action
              accessibilityStates=""
              icon="map-outline"
              onPress={() => {
                this.props.navigation.navigate(LOCATION_SCREEN_NAME, {
                  isFromHomePage: true,
                });
              }}
            />
            <Appbar.Action
              accessibilityStates=""
              icon="filter"
              onPress={() => {
                this.props.navigation.navigate(FILTER_SCREEN_NAME);
              }}
            />
          </Appbar.Header>
          {this.isFetchingInitialList && (
            <SkypeIndicator
              color={Colors.primary}
              style={BaseStyleSheet.screenMiddleStyle.middleStyle}
            />
          )}
          <FlatList
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            onEndReached={this.fetchRestaurantList}
            onEndReachedThreshold={0.2}
            style={{width: '100%'}}
            data={this.state.restaurantList}
            renderItem={this._renderItem}
            ListFooterComponent={this.renderFooterComponent}
            removeClippedSubviews={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    restaurantListSearchItemProps: state.restaurantListSearchReducer,
    locationItem: state.locationReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRestaurantListSearchParamsInRedux(item: RestaurantListSearchParams) {
      dispatch(restaurantListParamAction(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
