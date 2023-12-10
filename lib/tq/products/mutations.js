import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct, updateProduct, removeProduct } from "./api";
import { STORAGE_KEY } from "./settings";

const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useRemoveProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: removeProduct,
      onSuccess: () => {
        //Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
      },
    });
  };


export { useAddProduct, useUpdateProduct, useRemoveProduct };
