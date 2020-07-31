import * as Action from '../actioncreator/ActionType';
import {FilterParams} from '../../interfaces';

export const INITIAL_STATE: FilterParams = {
  isFiltered: false,
  categories: [],
  cuisines: [],
  radius: 1000,
  radiusKey: 2,
};

export default (state = INITIAL_STATE, action: any) => {
  if (action.type === Action.UPDATE_FILTER_PARAM) {
    return action.payload;
  }
  return state;
};
