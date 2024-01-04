import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
import db from '@/lib/api-functions/server/db';

const { Schema } = mongoose;

const OrderSchema = new Schema({
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

const CustomerOrder =
  mongoose.models.CustomerOrder || mongoose.model('CustomerOrder', OrderSchema);

export default CustomerOrder;
