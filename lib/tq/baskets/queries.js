// TanStack Querie hooks
import { useQuery } from '@tanstack/react-query';
import {
  getBasketQueryFn,
  getBasketsQueryFn,
  getUserBasketQueryFn,
} from '@/lib/tq/baskets/api';
import { STORAGE_KEY, USER_OWN_BASKET_STORAGE_KEY } from './settings';

export const useUserBasket = ({
  onSuccess = () => console.log('returned users basket'),
  onError = (err) => console.log(err),
} = {}) =>
  useQuery({
    queryKey: [USER_OWN_BASKET_STORAGE_KEY],
    queryFn: getUserBasketQueryFn,
    onSuccess,
    onError,
  });

export const useBaskets = ({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) =>
  useQuery({
    queryKey: [STORAGE_KEY],
    queryFn: getBasketsQueryFn,
    onSuccess,
    onError,
  });

export const useBasket = ({ onSuccess, onError }) => {
  useQuery({
    queryKey: [STORAGE_KEY, 'id'],
    queryFn: getBasketQueryFn,
    onSuccess,
    onError,
  });
};
