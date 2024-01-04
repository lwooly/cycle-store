import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateBasketMutateFn,
  addBasketMutateFn,
  removeBasketMutateFn,
  addToBasketMutateFn,
  removeFromBasketMutateFn,
  // emptyBasketMutateFn,
} from './api';
import { STORAGE_KEY, USER_OWN_BASKET_STORAGE_KEY } from './settings';

const useAddBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBasketMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useAddToBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => addToBasketMutateFn(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_OWN_BASKET_STORAGE_KEY],
      });
    },
  });
};

const useUpdateBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBasketMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useRemoveBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBasketMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useRemoveFromBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => removeFromBasketMutateFn(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_OWN_BASKET_STORAGE_KEY],
      });
    },
  });
};

export {
  useAddBasket,
  useUpdateBasket,
  useRemoveBasket,
  useAddToBasket,
  useRemoveFromBasket,
};
