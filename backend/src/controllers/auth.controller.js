import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body)
        res.status(201).json(new ApiResponse(201, "User registered succesfully"))
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try{
        const tokens = await loginUser(req.body)
        res.status(200).json(new ApiResponse(200, "Login Succesful", tokens))
    } catch (error){
        next(error)
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body

        const data = await refreshAccessToken(refreshToken)

        res.status(200).json(new ApiResponse(200, "Access token refreshed", data))
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) =>{
    try {
        await logoutUser(req.user.id)

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (err) {
        next(err)
    }
}