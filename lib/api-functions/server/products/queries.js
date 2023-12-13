import Product from '@/lib/api-functions/server/products/models';
import db from '@/lib/api-functions/server/db';

// Function to get all products from the database
export const getProductsFromDB = async (query = {}) =>
  await Product.find(query).exec();

// Function to get a single product from the database
export const getProductFromDB = async (id) => {
  console.log(id);
  const product = await Product.findById(id).exec();
  console.log('this function has been called');
  console.log('product', product);
  return product;
};

// Function to add a product to the database
export const addProductToDB = async (data) => {
  const newProduct = new Product(data);
  const result = await newProduct.save();
  return result;
};

// Function to update a product in the database when id and product data provided
export const updateProductInDB = async (id, productData) => {
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id },
    productData,
    { new: true, runValidators: true },
  );
  return updatedProduct;
};

// removes a product from the database when id provided.
export const removeProductFromDB = async (id) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
