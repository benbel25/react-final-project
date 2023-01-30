import Joi from 'joi-browser'

const signUpSchema = {
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    phone: Joi.string()
        .min(9)
        .max(15)
        .required()
        .regex(/^0[2-9][-]?\d{7,9}$|^05[0-9][-]?\d{7,9}$|^07[7,3][-]?\d{7,9}$/),
    password: Joi.string()
        .max(1024)
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{4,})(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
    roles: Joi.array().items(Joi.string().valid('admin', 'user')),

   

    // phone validation: .regex(/^0[2-9][-]?\d{7,9}$|^05[0-9][-]?\d{7,9}$|^07[7,3][-]?\d{7,9}$/)
}

export default signUpSchema
