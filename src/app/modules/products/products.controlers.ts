import { NextFunction, Request, Response } from 'express';
import { productServices } from './products.services';
import ProductValidationSchema from './products.zod.validation';

// controllers for create a new product
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // validation with zod
    const productData = ProductValidationSchema.parse(req.body);

    // create a new product
    const result = await productServices.createProductOnDB(productData);

    // send sucessfull response
    res.status(201).send({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error) {
    // call next function to send error response
    next(error);
  }
};

// controllers for retrive all products
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get search term
    const searchTerm = req.query.searchTerm as string;

    // if search term exist then search products
    if (searchTerm) {
      // search products
      const result =
        await productServices.retriveProductsBySearchTerm(searchTerm);

      // send response
      return res.status(200).send({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: result,
      });
    }

    // retrive all products
    const result = await productServices.retriveAllProducts();

    // send response
    res.status(200).send({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    // call next function to send error response
    next(error);
  }
};

// controllers for retrive single products by id
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    // retrive single product
    const result = await productServices.retriveSingleProductById(id);

    // if product doesn't exist then send error response
    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'Product not found!',
      });
    }

    // if product exist then send response
    res.status(200).send({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    // call next function to send error response
    next(error);
  }
};

// controllers for update a products by id
const updateAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    // validation with zod
    const productData = ProductValidationSchema.parse(req.body);

    // update a product
    const result = await productServices.updateAProductOnDB(id, productData);

    // if product doesn't exist then send error response
    if (!result) {
      return res.status(404).send({
        success: false,
        message: 'Product not found!',
      });
    }

    // if product exist then send response
    res.status(200).send({
      success: true,
      message: 'Products updated successfully!',
      data: result,
    });
  } catch (error) {
    // call next function to send error response
    next(error);
  }
};

// controllers for delete a products by id
const deleteAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    // delete a product
    const result = await productServices.deleteAProductOnDB(id);

    // if deleted count equal to 0 then send a error response
    if (result.deletedCount === 0) {
      return res.status(404).send({
        success: false,
        message: 'Product not found!',
      });
    }

    // send succssfull response
    res.status(200).send({
      success: true,
      message: 'Products deleted successfully!',
      data: null,
    });
  } catch (error) {
    // call next function to send error response
    next(error);
  }
};

export const productControlers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateAProduct,
  deleteAProduct,
};
