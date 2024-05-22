import { Router } from 'express';
import { orderControllers } from './orders.controlers';

const router = Router();

// routes for create an order
router.post('/', orderControllers.createOrder);

// routes for retrive all orders
router.get('/', orderControllers.getAllOrders);

export default router;
