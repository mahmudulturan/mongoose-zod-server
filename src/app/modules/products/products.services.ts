import { TInventory, TProduct } from './products.interface';
import Product from './products.model';

// services for create a new product
const createProductOnDB = async (data: TProduct) => {
  const result = await Product.create(data);
  return result;
};

// services for retrive all products
const retriveAllProducts = async () => {
  const result = await Product.find();
  return result;
};

// services for retrive single products by id
const retriveSingleProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// services for update a products by id
const updateAProductOnDB = async (id: string, data: TProduct) => {
  const result = await Product.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true },
  );
  return result;
};

// services for delete a products by id
const deleteAProductOnDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

// services for delete a products by id
const retriveProductsBySearchTerm = async (searchTerm: string) => {
  const result = await Product.find({
    name: { $regex: searchTerm, $options: 'i' },
  });
  return result;
};

// services for update a products by id with new Inventory
const updateProductInventory = async (id: string, newInventory: TInventory) => {
  await Product.findByIdAndUpdate(id, {
    inventory: newInventory,
  });
};

export const productServices = {
  createProductOnDB,
  retriveAllProducts,
  retriveSingleProductById,
  updateAProductOnDB,
  deleteAProductOnDB,
  retriveProductsBySearchTerm,
  updateProductInventory,
};
