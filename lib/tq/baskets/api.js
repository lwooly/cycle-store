// axios to access rest api created for the database in the lib/api-functions/server/Baskets folder
import axios from 'axios';

const BASKETS_ENDPOINT = `/api/v1/baskets`;

// user api actions
// get user basket - return one basket
const getUserBasketQueryFn = async () => {
  const response = await axios.get(`${BASKETS_ENDPOINT}/own`);
  return response.data;
};

const addToBasketMutateFn = async (itemId) => {
  const response = await axios.post(`${BASKETS_ENDPOINT}/own`, { itemId });
  return response.data;
};

const removeFromBasketMutateFn = async (itemId) => {
  console.log(itemId);
  const response = await axios.delete(`${BASKETS_ENDPOINT}/own/${itemId}`);
  return response.data;
};

const emptyBasketMutateFn = async () => {
  const response = await axios.delete(`${BASKETS_ENDPOINT}/own/all`);
  return response.data;
};

// admin api actions

// get Baskets
const getBasketsQueryFn = async () => {
  const { data } = await axios.get(BASKETS_ENDPOINT);
  return data;
};

const getBasketQueryFn = async (id) => {
  const { data } = await axios.get(`${BASKETS_ENDPOINT}/${id}`);
  return data;
};

const addBasketMutateFn = async (data) => {
  console.log('adding Basket', data);
  const response = await axios.post(`${BASKETS_ENDPOINT}`, data);
  return response.data;
};

const updateBasketMutateFn = async ({ _id, ...data }) => {
  console.log('updating Basket', data);
  const response = await axios.put(`${BASKETS_ENDPOINT}/${_id}`, data);
  return response.data;
};

const removeBasketMutateFn = async (id) => {
  const response = await axios.delete(`${BASKETS_ENDPOINT}/${id}`);
  return response.data;
};

export {
  // user
  addToBasketMutateFn,
  removeFromBasketMutateFn,
  emptyBasketMutateFn,
  getUserBasketQueryFn,
  // admin
  getBasketsQueryFn,
  getBasketQueryFn,
  addBasketMutateFn,
  updateBasketMutateFn,
  removeBasketMutateFn,
};
