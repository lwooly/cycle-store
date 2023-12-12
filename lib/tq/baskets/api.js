// axios to access rest api created for the database in the lib/api-functions/server/Baskets folder
import axios from 'axios'

const BASKETS_ENDPOINT = `/api/v1/baskets`;

//get Baskets
const getBasketsQueryFn = async () => {
        const { data } = await axios.get(BASKETS_ENDPOINT);
        return data;
}

const getBasketQueryFn = async (id) => {
        const { data } = await axios.get(`${BASKETS_ENDPOINT}/${id}`);
        return data;
}

const addBasketMutateFn = async (data) => {
        console.log('adding Basket', data)
        const response = await axios.post(`${BASKETS_ENDPOINT}`, data);
        return response.data;
}

const updateBasketMutateFn = async ({ _id, ...data }) => {
    console.log('updating Basket', data)
    const response = await axios.put(`${BASKETS_ENDPOINT}/${_id}`, data);
    return response.data;
}

const removeBasketMutateFn = async (id) => {
    const response = await axios.delete(`${BASKETS_ENDPOINT}/${id}`);
    return response.data;
}

export { getBasketsQueryFn, getBasketQueryFn, addBasketMutateFn, updateBasketMutateFn, removeBasketMutateFn }
