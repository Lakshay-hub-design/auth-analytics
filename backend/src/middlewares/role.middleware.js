import { ApiError } from "../utils/ApiError.js"

export const authorize = (...alowedRoles) => {
    return (req, res, next) => {
        if(!alowedRoles.includes(req.user.role)){
            throw new ApiError(403, "You do not have permission to access this route")
        }
        next()
    }
}