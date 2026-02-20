import { getUsers } from "../services/users.service";
import { ApiResponse } from "../utils/ApiResponse";

export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user
  });
};

export const listUsers = async (req, res, next) => {
  try {
    const data = await getUsers(req.query)

    res.status(200).json(
      new ApiResponse(200, "User fetched succesfully", data)
    )
  } catch (error) {
    next(error)
  }
}
