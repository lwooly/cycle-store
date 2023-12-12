import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBasketMutateFn, addBasketMutateFn, removeBasketMutateFn } from "./api";
import { STORAGE_KEY } from "./settings";

const useAddBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBasketMutateFn,
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useUpdateBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBasketMutateFn,
    onSuccess: () => {
      //Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

const useRemoveBasket = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: removeBasketMutateFn,
      onSuccess: () => {
        //Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
      },
    });
  };


export { useAddBasket, useUpdateBasket, useRemoveBasket };
