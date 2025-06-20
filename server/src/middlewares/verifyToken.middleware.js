import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    req.id = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

    console.log("Error in veriftToken", error.message);
  }
};

export default verifyToken;
