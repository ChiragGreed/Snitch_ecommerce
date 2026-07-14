import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Config } from '../src/config/config.js';
import cors from 'cors';
import morgan from 'morgan';
import ProductRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import publicRouter from './routes/publicRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const index = path.join(__dirname, '../', 'public/dist');

app.use(morgan("dev"));
app.use(express.static(index))

app.use(cors({
    origin: 'http://localhost:5173' || 'https://snitch-ecommerce.onrender.com',
    credentials: true
}));

app.use(cookieParser());

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: Config.GOOGLE_CLIENT_ID,
    clientSecret: Config.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://snitch-ecommerce.onrender.com/api/auth/google/callback',
}, (_, __, profile, done) => {
    return done(null, profile);
}))


app.use('/api/auth', authRouter);
app.use('/api/products', ProductRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.use('/', publicRouter);



export default app;