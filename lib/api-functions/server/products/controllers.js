import Product from '@/lib/api-functions/server/products/models';
import { addProductSchema, updateProductSchema } from '@/lib/validation';
import {
  getProductFromDB,
  addProductToDB,
  getProductsFromDB,
  updateProductInDB,
  removeProductFromDB,
} from './queries';

/**
 * Controller to get a single product or all products.
 * If an id is provided, fetches a single product; otherwise, fetches all products.
 * Sets cache headers for production environment.
 */
const getProducts = async (req, res) => {
  const { id } = req.params;

  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Cache-Control', 's-maxage=10', 'stale-while-revalidate');
  }

  try {
    let data = [];
    if (id) {
      // get products from database
      data = await getProductFromDB(id);
    } else {
      data = await getProductsFromDB();
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/**
 * Controller to add a new product.
 * Validates the product data before adding to the database.
 * If the image field is empty, it is removed from the product data.
 */
const addProduct = async (req, res) => {
  let productData = { ...req.body };

  if (productData.image === '') {
    delete productData.image;
  }

  try {
    productData = await addProductSchema.validate(productData);
    console.log(`PRODUCT_DATA`, productData);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result = await addProductToDB(productData);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

/**
 * Controller to update an existing product.
 * Validates the product data before updating in the database.
 * Requires an id to be provided; otherwise, it returns a 400 status.
 */
const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'No id provided to update' });
  }

  let productData = { ...req.body };

  if (productData.image === '') {
    delete productData.image;
  }

  try {
    productData = await updateProductSchema.validate(productData);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const updatedProduct = await updateProductInDB(id, productData);
    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/**
 * Controller to remove a product by id.
 * Requires an id to be provided; otherwise, it returns a 400 status.
 */
const removeProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'No id provided to delete' });
  }

  try {
    const result = await removeProductFromDB(id);
    res.status(204).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export { getProducts, addProduct, updateProduct, removeProduct };
