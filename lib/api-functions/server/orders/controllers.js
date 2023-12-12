import Order from "@/lib/api-functions/server/orders/models";
import { addOrderSchema, updateOrderSchema } from "@/lib/validation";
import {  getOrderFromDB, addOrderToDB, getOrdersFromDB, updateOrderInDB, removeOrderFromDB } from "./queries";

/**
 * Controller to get a single Order or all Orders.
 * If an id is provided, fetches a single Order; otherwise, fetches all Orders.
 * Sets cache headers for Orderion environment.
 */
const getOrders = async (req, res) => {
    
  const { id } = req.params;

  if (process.env.NODE_ENV === "production") {
    res.setHeader("Cache-Control", "s-maxage=10", "stale-while-revalidate");
  }

  try {
  let data = []
  if (id) {
    //get Orders from database
    data = await getOrderFromDB(id)
  } else {
    data = await getOrdersFromDB()
  }
  res.status(200).send(data);
    
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};


/**
 * Controller to add a new Order.
 * Validates the Order data before adding to the database.
 * If the image field is empty, it is removed from the Order data.
 */
const addOrder = async (req, res) => {

  let orderData = { ...req.body };

  if (orderData.image === "") {
    delete orderData.image;
  }

  try {
    orderData = await addOrderSchema.validate(orderData)
    console.log(`Order_DATA`, orderData)
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result = await addOrderToDB(orderData)
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


/**
 * Controller to update an existing Order.
 * Validates the Order data before updating in the database.
 * Requires an id to be provided; otherwise, it returns a 400 status.
 */
const updateOrder = async (req, res) => {
    const {id} = req.params;

  if (!id) {
    return res.status(400).json({message: 'No id provided to update'})
  }

  let orderData = { ...req.body };

  if (orderData.image === "") {
    delete orderData.image;
  }

  try {
    orderData = await updateOrderSchema.validate(orderData)
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const updatedOrder = await updateOrderInDB(id, orderData)
    res.status(200).send(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};


/**
 * Controller to remove a Order by id.
 * Requires an id to be provided; otherwise, it returns a 400 status.
 */
const removeOrder = async (req, res) => {
    const {id} = req.params;

  if (!id) {
    return res.status(400).json({message: 'No id provided to delete'})
  }

  try {
    const result = await removeOrderFromDB(id);
    res.status(204).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);

  }
};

export { getOrders, addOrder, updateOrder, removeOrder}