// TanStack Query hooks
import { useQuery } from '@tanstack/react-query';
import { getProductQueryFn, getProductsQueryFn } from '@/lib/tq/products/api';
import { STORAGE_KEY } from './settings';

export const useProducts = ({
  onSuccess = () => {},
  onError = (err) => console.log(err),
} = {}) =>
  useQuery({
    queryKey: [STORAGE_KEY],
    queryFn: getProductsQueryFn,
    onSuccess,
    onError,
  });

export const useProduct = ({ onSuccess, onError }) =>
  useQuery({
    queryKey: [STORAGE_KEY, 'id'],
    queryFn: getProductQueryFn,
    onSuccess,
    onError,
  });

