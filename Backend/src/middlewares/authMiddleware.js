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


export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const bearerToken = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;

        const token = bearerToken || req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not provided",
                success: false
            });
        }

        const decodedToken = JWT.verify(
            token,
            Config.JWT_SECRET
        );

        req.user = decodedToken.userId;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};
    

export const verifySessionId = async (req, res, next) => {
    const { sessionId } = req.cookies;

    console.log(sessionId);

    if (!sessionId) res.status(403).json({
        message: "SessionId not found",
        success: false,
        error: "SessionId not found"
    })

    const { clientEmail } = JWT.verify(sessionId, Config.JWT_SECRET);

    if (!clientEmail) res.status(403).json({
        message: "Invalid SessionId",
        success: false,
        error: "SessionId is invalid"
    })

    req.clientEmail = clientEmail;

    next();
}