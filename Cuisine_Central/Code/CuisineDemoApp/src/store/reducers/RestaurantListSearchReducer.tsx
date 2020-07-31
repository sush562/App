import * as Action from '../actioncreator/ActionType';

import {RestaurantListSearchParams} from '../../interfaces';

const INITIAL_STATE: RestaurantListSearchParams = {};

export default (state = INITIAL_STATE, action: any) => {
  if (action.type === Action.UPDATE_RESTAURANT_LIST_PARAM) {
    return action.payload;
  }
  return state;
};
