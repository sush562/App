import {axiosClient} from './ServiceConstants';
import {RestaurantListSearchParams, RestaurantListItem} from '../interfaces';

export const fetchRestaurants = async (params: RestaurantListSearchParams) => {
  const val = await axiosClient.get('/search?', arrangeRequestparams(params));
  return getRestaurantListDetails(val.data);
};

function arrangeRequestparams(passedparams: RestaurantListSearchParams) {
  let params: any = {};
  for (var key in passedparams) {
    params[key] = passedparams[key];
  }
  return {params};
}

function getRestaurantListDetails(resp: any) {
  let fetchedList = resp.restaurants;
  let list: RestaurantListItem[] = [];
  fetchedList.forEach((element: any) => {
    let insertItem: RestaurantListItem = {
      id: element.restaurant.id,
      name: element.restaurant.name,
      featured_image: element.restaurant.featured_image,
      user_rating: element.restaurant.user_rating,
    };
    list.push(insertItem);
  });
  //console.log('fetched list: ' + list);
  return list;
}

export const fetchRestaurantDetail = async (id: string) => {
  const val = await axiosClient.get('/restaurant', {params: {res_id: id}});
  return val.data;
};
