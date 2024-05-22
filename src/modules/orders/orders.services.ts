import { TOrder } from './orders.interface';
import Order from './orders.model';

// service for create an order
const createOrderOnDB = async (data: TOrder) => {
  const result = await Order.create(data);
  return result;
};

// service for retrive all orders
const retriveAllOrders = async () => {
  const result = await Order.find();
  return result;
};

// service for retrive orders by email
const retriveOrdersByEmail = async (email: string) => {
  const result = await Order.find({ email: email });
  return result;
};

export const orderServices = {
  createOrderOnDB,
  retriveAllOrders,
  retriveOrdersByEmail,
};
