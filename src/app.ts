import express, { NextFunction, Request, Response } from 'express';
import productsRoutes from './modules/products/products.routes';
import ordersRoutes from './modules/orders/orders.routes';
import { ZodError } from 'zod';

const app = express();

// parsers
app.use(express.json());

// routes
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

// home route
app.get('/', (req, res) => {
  res.send('Hello From Mongoose Zod Server!');
});

// handle not found route
app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      sucess: false,
      message: err.errors[0].message,
    });
  } else {
    res.status(500).send({
      success: false,
      message: err.message || 'Something went wrong!',
    });
  }
  next();
});
export default app;
