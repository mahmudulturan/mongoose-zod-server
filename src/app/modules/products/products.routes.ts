import { Router } from 'express';
import { productControlers } from './products.controlers';

const router = Router();

// route for create a new product
router.post('/', productControlers.createProduct);

// route for retrive all products
router.get('/', productControlers.getAllProducts);

// routes for retrive a single product
router.get('/:id', productControlers.getSingleProduct);

// routes for update a product
router.put('/:id', productControlers.updateAProduct);

// routes for delete a product
router.delete('/:id', productControlers.deleteAProduct);

export default router;
