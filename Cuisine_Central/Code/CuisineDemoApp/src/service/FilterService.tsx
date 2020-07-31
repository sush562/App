import {axiosClient} from './ServiceConstants';
import axios from 'axios';

export const fetchFilterItems = async (lat: string, lon: string) => {
  const [response1, response2] = await axios.all([
    axiosClient.get('/categories'),
    axiosClient.get('/cuisines', {params: {lat: lat, lon: lon}}),
  ]);
  return [response1, response2];
};
