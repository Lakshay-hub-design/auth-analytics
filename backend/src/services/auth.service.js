import jwt from "jsonwebtoken"
import { User } from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js'
import { generateAccessToken, generateRefreshToken } from '../utils/token.util.js'
import { env } from "../config/env.js"

export const registerUser = async ({name, email, password}) => {
    const existingUser = await User.findOne({ email })

    if(existingUser) {
        throw new ApiError(409, "Email already registered")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    return user
}

export const loginUser = async ({email, password}) => {
    const user = await User.findOne({email}).select("+password")
    if(!user){
        throw new ApiError(401, "Invalid email or password")
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch) {
        throw new ApiError(401, "Invalid email or password")
    }

    const accessToken = generateAccessToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    await user.save()

    return {
        accessToken,
        refreshToken    
    }
}

export const refreshAccessToken = async (refreshToken) => {
    let decoded
    try {
        decoded = jwt.verify(refreshToken, env.jwtRefreshSecret)
    } catch (err) {
        throw new ApiError(401, "Invalid refresh token")
    }

    const user = await User.findOne({
        _id: decoded.userId,
        refreshToken
    })

    if(!user){
        throw new ApiError(401, "Refresh token not found")
    }

    const newAccessToken = generateAccessToken(user._id, user.role)

    return { accessToken: newAccessToken}
}

export const logoutUser = async (userId) => {
    await User.findByIdAndUpdate(userId, {
        refreshToken: null
    })
}