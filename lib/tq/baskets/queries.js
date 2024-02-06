// TanStack Querie hooks
import { useQuery } from '@tanstack/react-query';
import {
  getBasketQueryFn,
  getBasketsQueryFn,
  getUserBasketQueryFn,
} from '@/lib/tq/baskets/api';
import {
  STORAGE_KEY,
  USER_OWN_BASKET_STORAGE_KEY,
  TEMP_BASKET_STORAGE_KEY,
} from './settings';
import { getTempBasketQueryFn } from '../products/api';

export const useUserBasket = ({
  runQuery = false,
  onSuccess = () => console.log('returned users basket'),
  onError = (err) => console.log(err),
} = {}) =>
  useQuery({
    queryKey: [USER_OWN_BASKET_STORAGE_KEY],
    queryFn: getUserBasketQueryFn,
    onSuccess,
    onError,
    enabled: runQuery,
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

export const useTemporaryBasket = ({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) =>
  useQuery({
    queryKey: [TEMP_BASKET_STORAGE_KEY],
    queryFn: getTempBasketQueryFn,
    onSuccess,
    onError,
  });

export const useUserOrTempBasket = ({
  onSuccess = () => {},
  onError = (err) => console.log(err),
  user,
} = {}) =>
  useQuery({
    queryKey: ['basket'],
    queryFn: () => {
      console.log(!!user.user);
      console.log(!user.isLoading);
      if (!!user.user) {
        return getUserBasketQueryFn();
      }
      console.log('here');
      return getTempBasketQueryFn();
    },
    onSuccess,
    onError,
    enabled: !user.isLoading,
  });
