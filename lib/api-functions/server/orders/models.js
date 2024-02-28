import mongoose from 'mongoose';
// eslint-disable-next-line no-unused-vars
import db from '@/lib/api-functions/server/db';
// eslint-disable-next-line no-unused-vars
import Product from '@/lib/api-functions/server/products/models';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  owner: {
    type: String, // Auth0 ID
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  receiptURL: {
    type: String, // stripe receipt url
    required: true,
  },
});

const CustomerOrder =
  mongoose.models.CustomerOrder || mongoose.model('CustomerOrder', OrderSchema);

export default CustomerOrder;
