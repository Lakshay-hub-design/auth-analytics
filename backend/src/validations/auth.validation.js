import Joi from "joi"

export const registerSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:Joi.string().email().required(),

    password: Joi.string()
    .min(8)
    .messages({
        "string.min": "Password must be at least 8 characters long"
    })
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$"))
    .messages({
        "string.pattern.base":
        "Password must contain uppercase, lowercase and a number"
    })
    .required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})