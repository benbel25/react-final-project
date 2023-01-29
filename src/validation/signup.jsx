import Joi from 'joi-browser'

const signUpSchema = {
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),

    password: Joi.string()
        .max(1024)
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{4,})(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
    roles: Joi.array().items(Joi.string().valid('admin', 'user')),

    //ADD CUSTOM ERROR MESSAGE
    // 'password.base': `Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character`,

    // phone validation: .regex(/^0[2-9][-]?\d{7,9}$|^05[0-9][-]?\d{7,9}$|^07[7,3][-]?\d{7,9}$/)
}

export default signUpSchema
