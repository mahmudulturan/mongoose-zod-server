import z from 'zod';

// order validation schema
const OrderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be an string.',
    })
    .min(1, 'Email cannot be empty.')
    .email({ message: 'Input an valid email' }),
  productId: z
    .string({
      required_error: 'ProductId is required',
      invalid_type_error: 'ProductId must be an string.',
    })
    .min(1, 'ProductId cannot be empty.'),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number.',
    })
    .positive('Quantity must be a positive number.'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number.',
    })
    .positive('Price must be a positive number.'),
});

export default OrderValidationSchema;
