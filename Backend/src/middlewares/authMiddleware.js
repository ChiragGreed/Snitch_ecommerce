import { Config } from "../config/config.js";
import JWT from 'jsonwebtoken';

export const authSeller = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({
        message: "User not authorised",
        success: false,
        error: "No token provided"
    })

    const decodedToken = JWT.verify(token, Config.JWT_SECRET);

    const { userId, role } = decodedToken;

    if (role == 'isBuyer') return res.status(403).json({
        message: "User not authorised",
        success: false,
        error: "User is not a seller"
    })

    req.user = userId;

    next();
} 