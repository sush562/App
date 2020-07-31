import {combineReducers} from 'redux';
import LocationReducer from './LocationReducer';
import RestaurantListSearchReducer from './RestaurantListSearchReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
  locationReducer: LocationReducer,
  restaurantListSearchReducer: RestaurantListSearchReducer,
  filterReducer: FilterReducer,
});
