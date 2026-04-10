import { Config } from "../config/config.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

function tokenGeneration(user, res) {

    const token = JWT.sign({
        userId: user._id,
        fullname: user.fullname,
    }, Config.JWT_SECRET,
        { expiresIn: '7d' });

    res.cookie("token", token);


}

export const registerController = async (req, res) => {
    const { fullname, email, contact, password, role = "isSeller" } = req.body;

    const userExist = await userModel.findOne({ $or: [{ fullname }, { email }] });

    if (userExist) return res.status(400).json({
        message: "User already exist from this " + (userExist.email == email ? "email" : "username"),
        success: false,
    })

    const user = await userModel.create({ fullname, email, password, contact, role });

    tokenGeneration(user,res);

    res.status(201).json({
        message: "User registered",
        success: true,
        user,
    })

}