import { config } from 'dotenv'
config();

if (!process.env.MONGO_URI) {
    throw new Error("Mongo Uri not found in environmental variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT Secret not found in environmental variables")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Google client id not found in environmental variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google client secret not found in environmental variables")
}

if (!process.env.GOOGLE_EMAIL_USER) {
    throw new Error("Google Email user not found in environmental variables")
}

if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    throw new Error("Imagekit private key not found in environmental variables")
}

if(!process.env.RAZORPAY_KEY_ID){
    throw new Error("Razorpay key id not found in environmental variables")
}

if(!process.env.RAZORPAY_KEY_SECRET){
    throw new Error("Razorpay key secret not found in environmental variables")
}

export const Config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,

    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_EMAIL_USER: process.env.GOOGLE_EMAIL_USER,

    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET
}