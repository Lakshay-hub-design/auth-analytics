import { registerUser } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const register = async (req, res, next) => {
    try {
        const user = registerUser(req.body)

        res.status(201).json(new ApiResponse(201, "User registered succesfully"))
    } catch (error) {
        next(error)
    }
}