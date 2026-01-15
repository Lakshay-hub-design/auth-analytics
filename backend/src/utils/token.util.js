import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const generateAccessToken = (userId, role) => {
    return jwt.sign({userId, role}, env.jwtAccessSecret, {
        expiresIn: '15m'
    })
}

export const generateRefreshToken = (userId) => {
    return jwt.sign({userId}, env.jwtRefreshSecret, {
        expiresIn: '7d'
    })
}