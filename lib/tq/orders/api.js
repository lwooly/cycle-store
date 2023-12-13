// axios to access rest api created for the database in the lib/api-functions/server/Orders folder
import axios from 'axios';

// api endpoint
// export const { HOST = 'http://localhost:3000/' } = process.env
// const OrderS_ENDPOINT = `${HOST}/api/v1/Orders`;
const ORDERS_ENDPOINT = `/api/v1/orders`;

// get Orders
const getOrdersQueryFn = async () => {
  const { data } = await axios.get(ORDERS_ENDPOINT);
  return data;
};

const getOrderQueryFn = async (id) => {
  const { data } = await axios.get(`${ORDERS_ENDPOINT}/${id}`);
  return data;
};

const addOrderMutateFn = async (data) => {
  console.log('adding Order', data);
  const response = await axios.post(`${ORDERS_ENDPOINT}`, data);
  return response.data;
};

const updateOrderMutateFn = async ({ _id, ...data }) => {
  console.log('updating Order', data);
  const response = await axios.put(`${ORDERS_ENDPOINT}/${_id}`, data);
  return response.data;
};

const removeOrderMutateFn = async (id) => {
  const response = await axios.delete(`${ORDERS_ENDPOINT}/${id}`);
  return response.data;
};

export {
  getOrdersQueryFn,
  getOrderQueryFn,
  addOrderMutateFn,
  updateOrderMutateFn,
  removeOrderMutateFn,
};
