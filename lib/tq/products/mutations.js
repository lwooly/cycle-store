import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateProductMutateFn,
  addProductMutateFn,
  removeProductMutateFn,
} from './api';
import { STORAGE_KEY } from './settings';

const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeProductMutateFn,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export { useAddProduct, useUpdateProduct, useRemoveProduct };
