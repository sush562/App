import * as Action from '../actioncreator/ActionType';

import {LocationItem} from '../../interfaces';

const INITIAL_STATE: LocationItem = {
  city_id: '',
  city_name: '',
  latitude: '0',
  longitude: '0',
  entity_id: 0,
  entity_type: '',
  country_id: 0,
  country_name: '',
  title: '',
};

export default (state = INITIAL_STATE, action: any) => {
  if (action.type === Action.UPDATE_LOCATION) {
    return action.payload;
  }
  return state;
};
