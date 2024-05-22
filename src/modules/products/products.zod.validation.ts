import { z } from 'zod';

// varient validation schema with meaningfull error message
const VarientValidationSchema = z.object({
  type: z
    .string({
      required_error: 'Variant type is required',
      invalid_type_error: 'Variant type must be a string',
    })
    .min(1, 'Variant type is required and cannot be empty.'),
  value: z
    .string({
      required_error: 'Variant value is required',
      invalid_type_error: 'Variant value must be a string',
    })
    .min(1, 'Variant value is required and cannot be empty.'),
});

// inventory validation schema with meaningfull error message
const InventoryValidationSchema = z.object({
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .nonnegative('Quantity must be a non-negative number.'),
  inStock: z.boolean({
    required_error: 'InStock is required',
    invalid_type_error: 'InStock must be a boolean',
  }),
});

// product validation schema with meaningfull error message
const ProductValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, 'Product name cannot be empty.'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description cannot be empty.'),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be a positive number.'),
  category: z
    .string({
      required_error: 'Category is required',
      invalid_type_error: 'Category must be a string',
    })
    .min(1, 'Category cannot be empty.'),
  tags: z
    .array(
      z.string({
        required_error: 'Tag is required',
        invalid_type_error: 'Every Tag must be a string',
      }),
    )
    .min(1, 'There must be at least one tag.'),
  variants: z
    .array(VarientValidationSchema, {
      invalid_type_error: 'Variants should be an array.',
    })
    .nonempty('There must be at least one variant.'),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
