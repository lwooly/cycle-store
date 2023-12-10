// TanStack Querie hooks
import { useQuery } from "@tanstack/react-query"
import { STORAGE_KEY } from "./settings"
import { getProduct, getProducts } from "./api"

export const useProducts = () => 
    useQuery({
        queryKey:[STORAGE_KEY],
        queryFn: getProducts
    });

export const useProduct = () => {
    useQuery({
        queryKey:[STORAGE_KEY, 'id'],
        queryFn: getProduct
    })
}