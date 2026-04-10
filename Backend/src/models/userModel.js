import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        unique: true,
        required: [true, "Fullname is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    contact: {
        type: Object,
        unique: true,
        required: [true, "Contact number is required"]
    },
    role: {
        type: String,
        required: [true, "A role is required"],
        enum: ["isSeller", "isBuyer"]
    }

})

const userModel = mongoose.model("users", userSchema);

export default userModel