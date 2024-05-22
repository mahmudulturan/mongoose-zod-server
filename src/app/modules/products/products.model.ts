import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct, TVariant } from './products.interface';

// variant schema
const variantSchema = new Schema<TVariant>({
  type: String,
  value: String,
}, { _id: false });

// inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: Number,
  inStock: Boolean,
}, { _id: false });

// product schema
const productSchema = new Schema<TProduct>({
  name: String,
  description: String,
  price: Number,
  category: String,
  tags: [String],
  variants: [variantSchema],
  inventory: inventorySchema,
});

const Product = mongoose.model<TProduct>('Product', productSchema);

export default Product;
