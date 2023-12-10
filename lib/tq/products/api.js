// axios to access rest api created for the database in the lib/api-functions/server/products folder

import axios from 'axios'

//api endpoint
const { HOST = 'http://localhost:3000/' } = process.env
const PRODUCTS_ENDPOINT = `${HOST}/api/v1/products`;

//get products
const getProducts = async () => {
    try {
        const { data } = await axios.get(PRODUCTS_ENDPOINT);
        return data;
    } catch (err) {
        console.log(err)
    }
}

const getProduct = async (id) => {
    try {
        const { data } = await axios.get(`${PRODUCTS_ENDPOINT}/${id}`);
        return data;
    } catch (err) {
        console.log(err)
    }
}

export { getProducts, getProduct }
