import { getAdminStats } from "../services/admin.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAdminData = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin"
  });
};


export const adminStats = async (req, res, next) => {
  try {
    const stats = await getAdminStats()

    res.status(200).json( new ApiResponse(200, "Admin stats fetched successfully", stats) )
  } catch (err) {
    next(err)
  }
}