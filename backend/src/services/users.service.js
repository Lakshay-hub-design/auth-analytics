import { User } from "../models/User.model.js";

export const getUsers = async (query) => {
    const page = Math.max(parseInt(query.page) || 1, 1)
    const limit = Math.min(parseInt(query.limit) || 10, 50)
    const skip = (page - 1) * limit

    const filter = {}

    if(query.role){
        filter.role = query.role
    }

    if(query.search){
        filter.$or = [
            { name: { $regex: query.search, $options: "i"} },
            { email: { $regex: query.search, $options: "i"} }
        ]
    }

    const [users, total] = await Promise.all([
        User.find(filter)
            .select("-password -refreshToken")
            .sort({ createdAt: -1})
            .skip(skip)
            .limit(limit),
        User.countDocuments(filter)
    ])

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        results: users
    }
}