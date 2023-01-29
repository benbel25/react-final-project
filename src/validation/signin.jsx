import Joi from 'joi-browser'

const signInSchema = {
    email: Joi.string()
        .min(6)
        .max(320)
        .required()
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),

    password: Joi.string()
        .max(1024)
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
}

export default signInSchema
