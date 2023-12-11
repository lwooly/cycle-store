// axios to access rest api created for the database in the lib/api-functions/server/products folder

import axios from 'axios'

//api endpoint
const { HOST = 'http://localhost:3000/' } = process.env
const PRODUCTS_ENDPOINT = `${HOST}/api/v1/products`;

//get products
const getProductsQueryFn = async () => {
        const { data } = await axios.get(PRODUCTS_ENDPOINT);
        return data;
}

const getProductQueryFn = async (id) => {
        const { data } = await axios.get(`${PRODUCTS_ENDPOINT}/${id}`);
        return data;
}

const addProductMutateFn = async (data) => {
        console.log('adding product', data)
        const response = await axios.post(`${PRODUCTS_ENDPOINT}`, data);
        return response.data;
}

const updateProductMutateFn = async (data) => {
    console.log('updating product', data)
    const response = await axios.put(`${PRODUCTS_ENDPOINT}/${data._id}`, data);
    return response.data;
}

const removeProductMutateFn = async (id) => {
    const response = await axios.delete(`${PRODUCTS_ENDPOINT}/${id}`);
    return response.data;
}

export { getProductsQueryFn, getProductQueryFn, addProductMutateFn, updateProductMutateFn, removeProductMutateFn }
