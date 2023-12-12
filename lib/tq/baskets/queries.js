// TanStack Querie hooks
import { useQuery } from "@tanstack/react-query"
import { STORAGE_KEY } from "./settings"
import { getBasketQueryFn, getBasketsQueryFn } from "@/lib/tq/baskets/api"

export const useBaskets = ({
    onSuccess = () => {},
    onError = (err) => console.log(err)
} = {}) => 
    useQuery({
        queryKey:[STORAGE_KEY],
        queryFn: getBasketsQueryFn,
        onSuccess,
        onError,
    });

export const useBasket = ({onSuccess, onError}) => {
    useQuery({
        queryKey:[STORAGE_KEY, 'id'],
        queryFn: getBasketQueryFn,
        onSuccess,
        onError,
    })
}