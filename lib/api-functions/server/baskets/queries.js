import Basket from "@/lib/api-functions/server/baskets/models";
import db from '@/lib/api-functions/server/db'

// Function to get all Baskets from the database
export const getBasketsFromDB = async (query = {}) => {
    return await Basket.find(query).exec();
}


// Function to get a single Basket from the database
export const getBasketFromDB = async (id) => {
    console.log(id)
    const basket = await Basket.findById(id).exec();
    console.log('this function has been called')
    console.log('Basket', basket)
    return basket
};


// Function to add a Basket to the database
export const addBasketToDB = async (data) => {
    const newBasket = new Basket(data);
    const result = await newBasket.save();
    return result;
}; 


// Function to update a Basket in the database when id and Basket data provided
export const updateBasketInDB = async (id, BasketData) => {
    const updatedBasket = await Basket.findOneAndUpdate(
        { _id: id },
        BasketData,
        { new: true, runValidators: true }
      );
    return updatedBasket;
};


//removes a Basket from the database when id provided.
export const removeBasketFromDB = async (id) => {
    const result = await Basket.findByIdAndDelete(id);
    return result;
}