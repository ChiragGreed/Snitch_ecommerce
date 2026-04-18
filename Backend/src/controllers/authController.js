import { config } from "dotenv";
import { Config } from "../config/config.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

function tokenGeneration(user, res) {

    const token = JWT.sign({
        userId: user._id,
        fullname: user.fullname,
        role: user.role
    }, Config.JWT_SECRET,
        { expiresIn: '7d' });

    res.cookie("token", token);

}

export const register = async (req, res) => {
    const { fullname, email, contact, password, role } = req.body;

    const userExist = await userModel.findOne({ $or: [{ fullname }, { email }] });

    if (userExist) return res.status(400).json({
        message: "User already exist from this " + (userExist.email == email ? "email" : "username"),
        success: false,
    })

    const user = await userModel.create({ fullname, email, password, contact, role });

    tokenGeneration(user, res);

    res.status(201).json({
        message: "User registered",
        success: true,
        user
    })

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) return res.status(400).json({
        message: "Invalid credentials",
        success: false,
    })

    const VerifyPassword = await bcrypt.compare(password, user.password);

    if (!VerifyPassword) return res.status(400).json({
        message: "Invalid credentials",
        success: false,
    })


    tokenGeneration(user, res);

    res.status(201).json({
        message: "User Logged in",
        success: true,
        user,
    })

}

export const getMe = async (req, res) => {

    const user = await userModel.findById(req.user);

    if (!user) return res.status(404).json({
        message: "User not found",
        success: false,
        error: "No user forund with this token"
    });

    res.status(200).json({
        message: "Fetched user details",
        success: true,
        user
    })

}

export const protectedRoute = async (req, res) => {
    res.status(200).json({
        message: "Protected route accessed",
        success: true,
    })
}

export const googleAuth = async (req, res) => {
    const { id, displayName, emails } = req.user;
    const email = emails[0].value;

    let user = await userModel.findOne({ email });

    if (!user) user = await userModel.create({ fullname: displayName, email, googleId: id });

    tokenGeneration(user, res);

    res.redirect('http://localhost:5173/');

}