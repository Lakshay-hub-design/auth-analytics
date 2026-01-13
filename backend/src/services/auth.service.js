import { User } from '../models/User.model.js'
import { ApiError } from '../utils/ApiError.js'

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