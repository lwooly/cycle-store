import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateOrderMutateFn,
  addOrderMutateFn,
  removeOrderMutateFn,
} from './api';
import { STORAGE_KEY } from './settings';

const useAddOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrderMutateFn,
    onSuccess: () => {
      // Invalidate and refetch

      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useRemoveOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeOrderMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export { useAddOrder, useUpdateOrder, useRemoveOrder };
