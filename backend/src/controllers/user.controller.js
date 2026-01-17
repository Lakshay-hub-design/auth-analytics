export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user
  });
};
