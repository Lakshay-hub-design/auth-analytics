import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { env } from "../config/env.js"

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            throw new ApiError(401, "Not authorized, token missing")
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, env.jwtAccessSecret)

        req.user = {
            id: decoded.userId,
            role: decoded.role
        }

        next()
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"))
    }
}