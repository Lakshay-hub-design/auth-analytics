import { loginUser, registerUser } from "../services/auth.service.js";
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