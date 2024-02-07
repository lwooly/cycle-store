// axios to access rest api created for the database in the lib/api-functions/server/products folder
import { getStoredProductIds } from '@/lib/api-functions/client/basket';
import axios from 'axios';

// api endpoint
// export const { HOST = 'http://localhost:3000/' } = process.env
// const PRODUCTS_ENDPOINT = `${HOST}/api/v1/products`;
const PRODUCTS_ENDPOINT = `/api/v1/products`;

// get products
const getProductsQueryFn = async () => {
  const { data } = await axios.get(PRODUCTS_ENDPOINT);
  return data;
};

const getProductQueryFn = async (id) => {
  const { data } = await axios.get(`${PRODUCTS_ENDPOINT}/${id}`);
  return data;
};

const getTempBasketQueryFn = async () => {
  const tempBasketItemIds = getStoredProductIds();
  if (tempBasketItemIds.length === 0) return { items: [] };

  // Corrected join syntax
  const idsQuery = tempBasketItemIds.join(',');
  const { data } = await axios.get(`${PRODUCTS_ENDPOINT}/?ids=${idsQuery}`);
  return { items: data };
};

const addProductMutateFn = async (data) => {
  console.log('adding product', data);
  const response = await axios.post(`${PRODUCTS_ENDPOINT}`, data);
  return response.data;
};

const updateProductMutateFn = async ({ _id, ...data }) => {
  console.log('updating product', data);
  const response = await axios.put(`${PRODUCTS_ENDPOINT}/${_id}`, data);
  return response.data;
};

const removeProductMutateFn = async (id) => {
  const response = await axios.delete(`${PRODUCTS_ENDPOINT}/${id}`);
  return response.data;
};

export {
  getProductsQueryFn,
  getProductQueryFn,
  getTempBasketQueryFn,
  addProductMutateFn,
  updateProductMutateFn,
  removeProductMutateFn,
};
