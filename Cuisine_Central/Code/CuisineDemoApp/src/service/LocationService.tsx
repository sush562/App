import {axiosClient} from './ServiceConstants';

export const SearchAreaQuery = async (text: string) => {
  console.log('SEARCH', text);
  const val = await axiosClient.get('/locations', {
    params: {query: text, count: 10},
  });
  return val.data.location_suggestions;
};

export const SearchAreaLatLng = async (lat: number, lng: number) => {
  const val = await axiosClient.get('/geocode', {
    params: {lat: lat, lon: lng},
  });
  return val.data.location;
};
