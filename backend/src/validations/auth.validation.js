import Joi from "joi"

export const registerSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    email:Joi.string().email().required(),

    password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$"))
    .required()
    .message({
        "string.pattren.base": "Password must contain uppercase, lowercase and a number"
    })
})