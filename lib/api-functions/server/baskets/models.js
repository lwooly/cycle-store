import mongoose from 'mongoose';
// import { Product } from '@/lib/api-functions/server/products/models';

const { Schema } = mongoose;

export const basketSchema = new Schema({
  owner: {
    type: String, // Auth0 ID
    required: true,
    unique: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Basket =
  mongoose?.models?.Basket || mongoose.model('Basket', basketSchema);
export default Basket;
