import Joi from 'joi-browser'

const passwordResetSchema = {
    password: Joi.string()
        .max(1024)
        .required()
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]{4,})(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
    confirmPassword: Joi.string(),
}
export default passwordResetSchema
