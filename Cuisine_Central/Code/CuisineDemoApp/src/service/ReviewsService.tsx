import {axiosClient} from './ServiceConstants';
import {ReviewListParameter} from '../interfaces';

export const fetchReviewsList = async (params: ReviewListParameter) => {
  const val = await axiosClient.get('/reviews', {
    params: {
      res_id: params.restaurantId,
      start: params.start,
      count: params.count,
    },
  });
  return val.data;
};
