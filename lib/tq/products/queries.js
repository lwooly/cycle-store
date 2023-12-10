// TanStack Querie hooks
import { useQuery } from "@tanstack/react-query"
import { STORAGE_KEY } from "./settings"
import { getProduct, getProducts } from "./api"

export const useProducts = ({
    onSuccess = () => {},
    onError = (err) => console.log(err)
} = {}) => 
    useQuery({
        queryKey:[STORAGE_KEY],
        queryFn: getProducts,
        onSuccess,
        onError,
    });

export const useProduct = ({onSuccess, onError}) => {
    useQuery({
        queryKey:[STORAGE_KEY, 'id'],
        queryFn: getProduct,
        onSuccess,
        onError,
    })
}