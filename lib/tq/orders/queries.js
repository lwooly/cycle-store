// TanStack Querie hooks
import { useQuery } from '@tanstack/react-query';
import { getOrderQueryFn, getOrdersQueryFn } from '@/lib/tq/orders/api';
import { STORAGE_KEY } from './settings';

export const useOrders = ({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) =>
  useQuery({
    queryKey: [STORAGE_KEY],
    queryFn: getOrdersQueryFn,
    onSuccess,
    onError,
  });

export const useOrder = ({ onSuccess, onError }) => {
  useQuery({
    queryKey: [STORAGE_KEY, 'id'],
    queryFn: getOrderQueryFn,
    onSuccess,
    onError,
  });
};
