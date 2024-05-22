import { NextFunction, Request, Response } from 'express';
import { orderServices } from './orders.services';
import { TProduct } from '../products/products.interface';
import { productServices } from '../products/products.services';
import OrderValidationSchema from './orders.zod.validation';

// controller for create an order
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = OrderValidationSchema.parse(req.body);

    // check if product is available in inventory
    const product: TProduct | null =
      await productServices.retriveSingleProductById(orderData.productId);
    if (product) {
      const orderedQuantity = orderData.quantity;
      const availableQuantity = product.inventory.quantity;

      // check if ordered quantity is available in inventory if not available then send an error response
      if (orderedQuantity > availableQuantity) {
        return res
          .status(422)
          .send({
            success: false,
            message: 'Insufficient quantity available in inventory',
          });
      }

      const newQuantity = availableQuantity - orderedQuantity;

      // updated product inventory
      const newInventory = {
        quantity: newQuantity,
        inStock: newQuantity > 0,
      };

      // update product inventory
      await productServices.updateProductInventory(
        orderData.productId,
        newInventory,
      );
    } else {
      return res
        .status(404)
        .send({ success: false, message: 'Product not found' });
    }

    // create an order
    const result = await orderServices.createOrderOnDB(orderData);
    res.status(201).send({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    // call next function to send error response
    next(error);
  }
};

// controller for retrive all orders
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.query.email as string;

    // if email exist then retrive orders via email
    if (email) {
      // retrive orders via email
      const result = await orderServices.retriveOrdersByEmail(email);
      return res.status(200).send({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    }

    // if email not exist then retrive all orders
    const result = await orderServices.retriveAllOrders();
    res.status(200).send({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
};
