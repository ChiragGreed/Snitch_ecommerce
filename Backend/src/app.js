import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Config } from '../src/config/config.js';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
app.use(express.json());


app.use(morgan());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:6060/api/auth/google/callback',
}, (_, __, profile, done) => {
    return done(null, profile);
}))


app.use('/api/auth', authRouter);


export default app;