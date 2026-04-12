import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

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
        select:false,
        required: [true, "Password is required"],
    },
    contact: {
        type: Number,
        unique: true,
    },
    role: {
        type: String,
        required: [true, "A role is required"],
        enum: ["isSeller", "isBuyer"]
    }

})


userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const userModel = mongoose.model("users", userSchema);

export default userModel