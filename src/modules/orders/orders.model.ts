import mongoose, { Schema } from 'mongoose';
import { TOrder } from './orders.interface';

const orderSchema = new Schema<TOrder>({
  email: String,
  productId: String,
  price: Number,
  quantity: Number,
});

const Order = mongoose.model<TOrder>('Order', orderSchema);

export default Order;
