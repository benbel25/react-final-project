import Joi from 'joi-browser'

const cardSchmea = {
    productName: Joi.string().min(2).max(255).required(),
    productDescription: Joi.string().min(2).max(1024).required(),
    productPrice: Joi.number().min(2).max(10000).required(),
    productQuantity: Joi.number().min(1).max(1024).required(),
    productImage: Joi.string().min(11).max(1024).uri().allow(''),
    productCategories: [
        Joi.string().min(2).max(1024).allow(''),
        Joi.array().items(Joi.string().min(2).max(1024).allow('')),
    ],
}

export default cardSchmea
