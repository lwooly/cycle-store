import Order from '@/lib/api-functions/server/orders/models';
import db from '@/lib/api-functions/server/db';

// Function to get all Orders from the database
export const getOrdersFromDB = async (query = {}) =>
  await Order.find(query).exec();

// Function to get a single Order from the database
export const getOrderFromDB = async (id) => {
  console.log(id);
  const Order = await Order.findById(id).exec();
  console.log('this function has been called');
  console.log('Order', Order);
  return Order;
};

// Function to add a Order to the database
export const addOrderToDB = async (data) => {
  const newOrder = new Order(data);
  const result = await newOrder.save();
  return result;
};

// Function to update a Order in the database when id and Order data provided
export const updateOrderInDB = async (id, OrderData) => {
  const updatedOrder = await Order.findOneAndUpdate({ _id: id }, OrderData, {
    new: true,
    runValidators: true,
  });
  return updatedOrder;
};

// removes a Order from the database when id provided.
export const removeOrderFromDB = async (id) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};
