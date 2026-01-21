import express from "express"
import { login, logout, refreshToken, register } from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { loginSchema, refreshSchema, registerSchema } from "../validations/auth.validation.js"
import { protect } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/refresh', validate(refreshSchema), refreshToken)
router.post('/logout', protect, logout)

export default router