import * as Action from './ActionType';
import {
  LocationItem,
  RestaurantListSearchParams,
  FilterParams,
} from '../../interfaces';

export function locationUpdateAction(item: LocationItem) {
  return {
    type: Action.UPDATE_LOCATION,
    payload: item,
  };
}

export function restaurantListParamAction(item: RestaurantListSearchParams) {
  return {
    type: Action.UPDATE_RESTAURANT_LIST_PARAM,
    payload: item,
  };
}

export function filterUpdateAction(item: FilterParams) {
  return {
    type: Action.UPDATE_FILTER_PARAM,
    payload: item,
  };
}
