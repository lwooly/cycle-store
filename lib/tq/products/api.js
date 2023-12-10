// axios to access rest api created for the database in the lib/api-functions/server/products folder

import axios from 'axios'

//api endpoint
const { HOST = 'http://localhost:3000/' } = process.env
const PRODUCTS_ENDPOINT = `${HOST}/api/v1/products`;

//get products
const getProducts = async () => {
        const { data } = await axios.get(PRODUCTS_ENDPOINT);
        return data;
}

const getProduct = async (id) => {
        const { data } = await axios.get(`${PRODUCTS_ENDPOINT}/${id}`);
        return data;
}

const addProduct = async (data) => {
        console.log('adding product', data)
        const response = await axios.post(`${PRODUCTS_ENDPOINT}/${id}`, newProduct);
        return response.data;
}

const updateProduct = async ({data, id}) => {
    console.log('updating product', data)
    const response = await axios.put(`${PRODUCTS_ENDPOINT}/${id}`, data);
    return response.data;
}

const removeProduct = async (id) => {
    const response = await axios.delete(`${PRODUCTS_ENDPOINT}/${id}`);
    return response.data;
}

export { getProducts, getProduct, addProduct, updateProduct, removeProduct }
