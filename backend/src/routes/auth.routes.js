import express from "express"
import { register } from "../controllers/auth.controller"
import { validate } from "../middlewares/validate.middleware"
import { registerSchema } from "../validations/auth.validation"

const router = express.Router()

router.post('/register', validate(registerSchema), register)

export default router