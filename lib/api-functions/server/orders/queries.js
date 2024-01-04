// eslint-disable-next-line no-unused-vars
import db from '@/lib/api-functions/server/db';
import CustomerOrder from '@/lib/api-functions/server/orders/models';

// Function to get all Orders from the database
export const getOrdersFromDB = async (query = {}) =>
  CustomerOrder.find(query).exec();

// Function to get a single Order from the database
export const getOrderFromDB = async (id) => {
  console.log(id);
  const Order = await CustomerOrder.findById(id).exec();
  console.log('this function has been called');
  console.log('Order', Order);
  return Order;
};

// Function to add a Order to the database
export const addOrderToDB = async (data) => {
  const newOrder = new CustomerOrder(data);
  const result = await newOrder.save();
  return result;
};

// Function to update a Order in the database when id and Order data provided
export const updateOrderInDB = async (id, OrderData) => {
  const updatedOrder = await CustomerOrder.findOneAndUpdate(
    { _id: id },
    OrderData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedOrder;
};

// removes a Order from the database when id provided.
export const removeOrderFromDB = async (id) => {
  const result = await CustomerOrder.findByIdAndDelete(id);
  return result;
};
