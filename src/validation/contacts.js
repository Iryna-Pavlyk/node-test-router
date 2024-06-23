import Joi from 'joi';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label}e should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
    'any.required': 'Field {#label} is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .min(10)
    .max(13)
    .required()
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.pattern.base': 'Field {#label} should have only numbers',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
      'any.required': 'Field {#label} is required',
    }),
  email: Joi.string()
    .email()
    .messages({ 'string.base': 'Field {#label} should be a string' }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Field {#label} should be a boolean: true or false',
  }),
  contactType: Joi.string().valid('personal', 'work', 'home').messages({
    'string.base': 'Field {#label} should be a string',
    'any.only': 'Field {#label} should have one of next value: {#valids}',
  }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).messages({
    'string.base': 'Field {#label} should be a string',
    'string.min': 'Field {#label}e should have at least {#limit} characters',
    'string.max': 'Field {#label} should have at most {#limit} characters',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .min(10)
    .max(13)
    .messages({
      'string.base': 'Field {#label} should be a string',
      'string.pattern.base': 'Field {#label} should have only numbers',
      'string.min': 'Field {#label} should have at least {#limit} characters',
      'string.max': 'Field {#label} should have at most {#limit} characters',
    }),
  email: Joi.string().email().messages({
    'string.base': 'Field {#label} should be a string',
    'string.email': 'Field {#label} should have a correct email',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'Field {#label} should be a boolean: true or false',
  }),
  contactType: Joi.string().valid('personal', 'work', 'home').messages({
    'string.base': 'Field {#label} should be a string',
    'any.only': 'Field {#label} should have one of next value: {#valids}',
  }),
});

// const dataToValidate = {
//   name: 'Jo',
//   phoneNumber: '380966077777',
//   email: 'john.doe@example.com',
//   isFavourite: true,
//   contactType: 'home',
// };

// export const validationResult = createContactsSchema.validate(dataToValidate, {
//   abortEarly: false,
// });
// if (validationResult.error) {
//   console.error(validationResult.error.message);
// } else {
//   console.log('Data is valid!');
// }
