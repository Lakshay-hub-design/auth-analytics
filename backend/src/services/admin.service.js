import { User } from "../models/User.model";

export const getAdminStats = async () => {
    const totalUsersPromise = User.countDocuments()

    const userByRolePromise = User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } }
    ])

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newUsersLast7DaysPromise = User.aggregate([
        { $match: { createdAt: { $gte: sevenDaysAgo } } },
        {
        $group: {
            _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
            },
            count: { $sum: 1 }
        }
        },
        { $sort: { _id: 1 } }
    ]);

    const [totalUser, userByRole, newUsersLast7Days] = await Promise.all([
        totalUsersPromise,
        userByRolePromise,
        newUsersLast7DaysPromise
    ])

    return {
        totalUser,
        userByRole,
        newUsersLast7Days
    }
}