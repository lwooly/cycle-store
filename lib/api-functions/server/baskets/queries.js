import Basket from '@/lib/api-functions/server/baskets/models';
// eslint-disable-next-line no-unused-vars
import db from '@/lib/api-functions/server/db';

// Function to get all Baskets from the database
export const getBasketsFromDB = async (query = {}) => Basket.find(query).exec();

// Function to get a single Basket from the database
export const getBasketFromDB = async (id) => {
  const basket = await Basket.findById(id).exec();
  return basket;
};

// Function to add a Basket to the database
export const addBasketToDB = async (data) => {
  const newBasket = new Basket(data);
  const result = await newBasket.save();
  return result;
};

// Function to get all items in users basket
export const getUserBasketFromDB = async (sub, createIfNotFound = false) => {
  const results = await Basket.findOne({ owner: sub }).populate('items').exec();
  if (!results && createIfNotFound && sub) {
    await addBasketToDB({ owner: sub, items: [] });
  }
  return results;
};

// Function to update a Basket in the database when id and Basket data provided
export const updateBasketInDB = async (id, BasketData) => {
  const updatedBasket = await Basket.findOneAndUpdate({ _id: id }, BasketData, {
    new: true,
    runValidators: true,
  });
  return updatedBasket;
};

// Function to empty a Basket in the database when id provided
export const emptyBasketInDB = async (ownerId) => {
  const updatedBasket = await Basket.findOneAndUpdate(
    { owner: ownerId },
    { items: [] },
  );
  console.log(updatedBasket);
  return updatedBasket;
};

// removes a Basket from the database when id provided.
export const removeBasketFromDB = async (id) => {
  const result = await Basket.findByIdAndDelete(id);
  return result;
};
