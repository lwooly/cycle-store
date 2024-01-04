// import Basket from '@/lib/api-functions/server/baskets/models';
// import { addBasketSchema, updateBasketSchema } from '@/lib/validation';
import {
  getBasketFromDB,
  addBasketToDB,
  getBasketsFromDB,
  updateBasketInDB,
  removeBasketFromDB,
  getUserBasketFromDB,
} from './queries';

// USER

// Controller to get user basket
const getOwnBasket = async (req, res) => {
  const owner = req?.user?.sub;
  try {
    const data = await getUserBasketFromDB(owner, true);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
  return undefined;
};

const addProductToUserBasket = async (req, res) => {
  const { itemId } = req.body;
  console.log(itemId);
  const owner = req?.user?.sub;

  try {
    const basket = await getUserBasketFromDB(owner, false);
    basket.items.push(itemId);
    const result = await basket.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
  return undefined;
};

const removeItemFromUserBasket = async (req, res) => {
  const { item: itemId } = req.params;
  const owner = req?.user?.sub;

  if (!itemId) {
    return res.status(400).json({ message: 'No item provided to delete' });
  }

  try {
    const basket = await getUserBasketFromDB(owner);
    console.log(basket.items);

    const index = basket.items.findIndex(
      // eslint-disable-next-line no-underscore-dangle
      (item) => item._id.toString() === itemId,
    );
    basket.items.splice(index, 1);
    const result = await basket.save();
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
  return undefined;
};

// ADMIN
/**
 * Controller to get a single Basket or all Baskets.
 * If an id is provided, fetches a single Basket; otherwise, fetches all Baskets.
 * Sets cache headers for Basketion environment.
 */
const getBaskets = async (req, res) => {
  const { id } = req.params;

  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Cache-Control', 's-maxage=10', 'stale-while-revalidate');
  }

  try {
    let data = [];
    if (id) {
      // get Baskets from database
      data = await getBasketFromDB(id);
    } else {
      data = await getBasketsFromDB();
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/**
 * Controller to add a new Basket.
 * Validates the Basket data before adding to the database.
 * If the image field is empty, it is removed from the Basket data.
 */
const addBasket = async (req, res) => {
  const BasketData = { ...req.body };

  if (BasketData.image === '') {
    delete BasketData.image;
  }

  // Omit validation of basket schema - add in if admins allowed to add
  // try {
  //   BasketData = await addBasketSchema.validate(BasketData);
  //   console.log(`Basket_DATA`, BasketData);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json(err);
  // }

  try {
    const result = await addBasketToDB(BasketData);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  return undefined;
};

/**
 * Controller to update an existing Basket.
 * Validates the Basket data before updating in the database.
 * Requires an id to be provided; otherwise, it returns a 400 status.
 */
const updateBasket = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'No id provided to update' });
  }

  const BasketData = { ...req.body };

  if (BasketData.image === '') {
    delete BasketData.image;
  }

  // Ommit validation of basket schema - add in if admins allowed to update
  // try {
  //   BasketData = await updateBasketSchema.validate(BasketData);
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json(err);
  // }

  try {
    const updatedBasket = await updateBasketInDB(id, BasketData);
    res.status(200).send(updatedBasket);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  return undefined;
};

/**
 * Controller to remove a Basket by id.
 * Requires an id to be provided; otherwise, it returns a 400 status.
 */
const removeBasket = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'No id provided to delete' });
  }

  try {
    const result = await removeBasketFromDB(id);
    res.status(204).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
  return undefined;
};

export {
  getBaskets,
  getOwnBasket,
  addBasket,
  updateBasket,
  removeBasket,
  addProductToUserBasket,
  removeItemFromUserBasket,
};
