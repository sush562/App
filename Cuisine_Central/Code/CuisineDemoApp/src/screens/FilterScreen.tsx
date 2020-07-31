import React from 'react';
import {View, SafeAreaView, Text, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Appbar, Divider} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {SkypeIndicator} from 'react-native-indicators';

import {
  baseStyle,
  FilterScreenStyle,
  containerStyle,
} from '../style/BaseStyleSheet';
import {
  isNetworkAvailable,
  displayInternetError,
  displayAlert,
} from '../utils/Util';
import {
  restaurantListParamAction,
  filterUpdateAction,
} from '../store/actioncreator';
import {fetchFilterItems} from '../service/FilterService';
import {
  RestaurantListSearchParams,
  LocationItem,
  FilterParams,
  CategoriesItem,
  CuisineItem,
} from '../interfaces';
import ChipCategoriesComponent from '../components/ChipCategoriesComponent';
import ChipCuisineComponent from '../components/ChipCuisineComponent';
import {Colors} from '../utils/Colors';
import FilterSlider from '../components/FilterSliderComponent';
import {INITIAL_STATE as FILTER_INITIAL_STATE} from '../store/reducers/FilterReducer';
import {HOME_SCREEN_NAME} from '../utils/Data';

interface Props {
  navigation: any;
  filterItem: FilterParams;
  updateFilterParamsInRedux: Function;
  updateRestaurantListSearchParamsInRedux: Function;
  locationItem: LocationItem;
  restaurantListSearchItem: RestaurantListSearchParams;
}

interface State {
  categoriesList: CategoriesItem[];
  cuisinesList: CuisineItem[];
  isFetchingdata: boolean;
}

class FilterScreen extends React.PureComponent<Props, State> {
  selectedCuisineIds: number[] = [];
  selectedCategoriesIds: number[] = [];
  searchRadius: number = 1000;
  searchRadiusKey: number = 2;

  constructor(props: Props) {
    super(props);
    this.state = {
      categoriesList: [],
      cuisinesList: [],
      isFetchingdata: false,
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.selectCuisine = this.selectCuisine.bind(this);
    this.radiusCallback = this.radiusCallback.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.filterClearAlert = this.filterClearAlert.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.initialDataSetup();
  }

  componentDidMount() {
    if (isNetworkAvailable()) {
      this.setState({isFetchingdata: true});
      setTimeout(() => {
        fetchFilterItems(
          this.props.locationItem.latitude,
          this.props.locationItem.longitude,
        )
          .then((val) => {
            this.setState({
              categoriesList: val[0].data.categories,
              cuisinesList: val[1].data.cuisines,
              isFetchingdata: false,
            });
          })
          .catch((e) => {
            console.log(e);
            this.setState({isFetchingdata: false});
            displayAlert(
              'Error',
              'There was some issue in fetching the filters. Please try again later',
            );
          });
      }, 1000);
    } else {
      displayInternetError();
    }
  }

  initialDataSetup() {
    if (this.props.filterItem.categories.length > 0) {
      this.props.filterItem.categories.forEach((element) => {
        this.selectedCategoriesIds.push(element);
      });
    }

    if (this.props.filterItem.cuisines.length > 0) {
      this.props.filterItem.cuisines.forEach((element) => {
        this.selectedCuisineIds.push(element);
      });
    }
    this.searchRadius = this.props.filterItem.radius;
    this.searchRadiusKey = this.props.filterItem.radiusKey;
  }

  selectCategory(id: number) {
    if (this.selectedCategoriesIds.indexOf(id) > -1) {
      this.selectedCategoriesIds.splice(
        this.selectedCategoriesIds.indexOf(id),
        1,
      );
    } else {
      this.selectedCategoriesIds.push(id);
    }
  }

  isCategorySelected(id: number): boolean {
    return this.selectedCategoriesIds.indexOf(id) > -1;
  }

  selectCuisine(id: number) {
    if (this.selectedCuisineIds.indexOf(id) > -1) {
      this.selectedCuisineIds.splice(this.selectedCuisineIds.indexOf(id), 1);
    } else {
      this.selectedCuisineIds.push(id);
    }
  }

  radiusCallback(radiusKey: number) {
    this.searchRadiusKey = radiusKey;
    switch (radiusKey) {
      case 1:
        this.searchRadius = 500;
        break;
      case 2:
        this.searchRadius = 1000;
        break;
      case 3:
        this.searchRadius = 2000;
        break;
      case 4:
        this.searchRadius = 3000;
        break;
      case 5:
        this.searchRadius = 5000;
        break;
      case 6:
        this.searchRadius = 10000;
        break;
      default:
        this.searchRadius = 1000;
        break;
    }
  }

  setFilter() {
    // console.log(this.selectedCategoriesIds);
    // console.log(this.selectedCuisineIds);
    // console.log(this.searchRadius);
    const filterParam: FilterParams = {
      categories: this.selectedCategoriesIds,
      cuisines: this.selectedCuisineIds,
      radius: this.searchRadius,
      radiusKey: this.searchRadiusKey,
      isFiltered: true,
    };
    filterParam.isFiltered =
      filterParam.categories.length > 0 ||
      filterParam.cuisines.length > 0 ||
      filterParam.radius !== FILTER_INITIAL_STATE.radius;
    this.props.updateFilterParamsInRedux(filterParam);
    const restSearchParam: RestaurantListSearchParams = {
      ...this.props.restaurantListSearchItem,
    };
    restSearchParam.radius = this.searchRadius;
    restSearchParam.category = this.selectedCategoriesIds.join(',');
    restSearchParam.cuisines = this.selectedCuisineIds.join(',');
    console.log(restSearchParam);
    this.props.updateRestaurantListSearchParamsInRedux(restSearchParam);
    this.props.navigation.reset({
      index: 0,
      routes: [{name: HOME_SCREEN_NAME}],
    });
  }

  filterClearAlert() {
    if (!this.state.isFetchingdata) {
      const isFiltered: boolean =
        this.selectedCategoriesIds.length > 0 ||
        this.selectedCuisineIds.length > 0 ||
        this.searchRadius !== FILTER_INITIAL_STATE.radius;
      if (isFiltered) {
        Alert.alert(
          'Warning',
          'Are you sure you want to clear all filters?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => this.clearAllFilters()},
          ],
          {cancelable: false},
        );
      }
    }
  }

  clearAllFilters() {
    this.props.updateFilterParamsInRedux(FILTER_INITIAL_STATE);
    const restSearchParam: RestaurantListSearchParams = {
      ...this.props.restaurantListSearchItem,
    };
    restSearchParam.radius = FILTER_INITIAL_STATE.radius;
    restSearchParam.category = '';
    restSearchParam.cuisines = '';
    console.log(restSearchParam);
    this.props.updateRestaurantListSearchParamsInRedux(restSearchParam);
    this.props.navigation.reset({
      index: 0,
      routes: [{name: HOME_SCREEN_NAME}],
    });
  }

  render() {
    return (
      <SafeAreaView style={containerStyle.container}>
        <Appbar.Header
          accessibilityStates=""
          style={baseStyle.toolbarBaseStyle}>
          <Appbar.BackAction
            accessibilityStates=""
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <Appbar.Content
            accessibilityStates=""
            title="Filter"
            titleStyle={baseStyle.textBaseStyle}
          />
          <Appbar.Action
            accessibilityStates=""
            icon="filter-remove"
            onPress={() => {
              this.filterClearAlert();
            }}
          />
        </Appbar.Header>
        <ScrollView
          style={FilterScreenStyle.scroll}
          showsVerticalScrollIndicator={true}>
          {!this.state.isFetchingdata && (
            <View style={baseStyle.baseParentViewStyle}>
              <FilterSlider
                searchRadiusKey={this.searchRadiusKey}
                radiusCallback={this.radiusCallback}
              />
              <Divider accessibilityStates="" style={{marginTop: 10}} />
              <Text style={FilterScreenStyle.filterTitleStyle}>Categories</Text>
              <View style={FilterScreenStyle.categoryStyle}>
                {this.state.categoriesList.map((item, index) => {
                  return (
                    <ChipCategoriesComponent
                      categoriesItem={item}
                      selectCategory={this.selectCategory}
                      isSelected={
                        this.selectedCategoriesIds.indexOf(item.categories.id) >
                        -1
                      }
                    />
                  );
                })}
              </View>
              <Divider accessibilityStates="" style={{marginTop: 10}} />
              <Text style={FilterScreenStyle.filterTitleStyle}>Cuisines</Text>
              <View style={FilterScreenStyle.categoryStyle}>
                {this.state.cuisinesList.map((item, index) => {
                  return (
                    <ChipCuisineComponent
                      cuisineItem={item}
                      selectCuisine={this.selectCuisine}
                      isSelected={
                        this.selectedCuisineIds.indexOf(
                          item.cuisine.cuisine_id,
                        ) > -1
                      }
                    />
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
        {!this.state.isFetchingdata && (
          <View style={{margin: 10}}>
            <Button
              title="Filter"
              onPress={this.setFilter}
              buttonStyle={FilterScreenStyle.filterButtonStyle}
            />
          </View>
        )}
        {this.state.isFetchingdata && (
          <SkypeIndicator
            color={Colors.primary}
            style={FilterScreenStyle.indicatorStyle}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    restaurantListSearchItem: state.restaurantListSearchReducer,
    locationItem: state.locationReducer,
    filterItem: state.filterReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateRestaurantListSearchParamsInRedux(item: RestaurantListSearchParams) {
      dispatch(restaurantListParamAction(item));
    },
    updateFilterParamsInRedux(item: FilterParams) {
      dispatch(filterUpdateAction(item));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterScreen);
