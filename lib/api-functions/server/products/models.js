import mongoose from 'mongoose';
import db from '@/lib/api-functions/server/db';

// Add these console logs for debugging
// console.log("Mongoose Connection State:", mongoose.connection.readyState);
console.log('Mongoose Models:', mongoose.models);

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default:
      'https://images.unsplash.com/photo-1540965555-ef9a836372ed?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  favorites: {
    type: Number,
    default: 0,
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
