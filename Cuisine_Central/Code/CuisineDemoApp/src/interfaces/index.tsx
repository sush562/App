export interface LocationItem {
  city_id: string;
  city_name: string;
  latitude: string;
  longitude: string;
  entity_id: number;
  entity_type: string;
  country_id: number;
  country_name: string;
  title: string;
}

export interface AreaSearchResult {
  entity_type: string;
  entity_id: number;
  title: string;
  latitude: string;
  longitude: string;
  city_id: string;
  city_name: string;
  country_id: number;
  country_name: string;
}

export interface RestaurantListSearchParams {
  entity_id: number;
  entity_type:
    | ''
    | 'city'
    | 'subzone'
    | 'zone'
    | 'landmark'
    | 'metro'
    | 'group';
  q: string;
  start: number;
  count: 20;
  lat: string;
  lng: string;
  radius: number;
  cuisines: string;
  establishment_type: string;
  collection_id: string;
  category: string;
  sort: '' | 'cost' | 'rating' | 'real_distance';
  order: '' | 'asc' | 'desc';
}

export interface FilterParams {
  isFiltered: boolean;
  categories: number[];
  cuisines: number[];
  radius: number;
  radiusKey: number;
}

export interface CategoriesItem {
  categories: {id: number; name: string};
}

export interface CuisineItem {
  cuisine: {cuisine_id: number; cuisine_name: string};
}

export interface RestaurantListItem {
  id: string;
  name: string;
  featured_image: string;
  user_rating: {
    aggregate_rating: string;
    rating_color: string;
    rating_text: string;
    votes: number;
  };
}

export interface RestaurantDetailItem extends RestaurantListItem {
  location: RestaurantLocation;
  cuisines: string;
  timings: string;
  average_cost_for_two: number;
  highlights: string[];
  phone_numbers: string;
  currency: string;
  all_reviews_count: number;
  url: string;
  deeplink: string;
}

interface RestaurantLocation {
  address: string;
  locality: string;
  city: string;
  city_id: number;
  latitude: string;
  longitude: string;
  zipcode: string;
}

export interface ReviewListParameter {
  restaurantId: string;
  start: number;
  count: 10;
}

export interface ReviewItem {
  review: {
    rating: number;
    review_text: string;
    id: number;
    rating_color: string;
    review_time_friendly: string;
    rating_text: string;
    user: {
      name: string;
      foodie_color: string;
      profile_url: string;
      profile_image: string;
      profile_deeplink: string;
    };
  };
}
