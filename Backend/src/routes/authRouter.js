import express from 'express';
import { forgotPassword, getMe, googleAuth, login, protectedRoute, register, resetPassword, sessionProtectedRoute } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validation/authValidation.js';
import passport from 'passport';
import { verifySessionId, verifyToken } from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, register);

authRouter.post('/login', loginValidator, login);

authRouter.get('/getMe', verifyToken, getMe);

authRouter.post('/forgotPassword', forgotPassword);

authRouter.patch('/resetPassword/:sessionId', verifySessionId, resetPassword);

authRouter.get('/sessionProtectedRoute', verifySessionId, sessionProtectedRoute);

authRouter.get('/protectedRoute', verifyToken, protectedRoute);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/login' }),
    googleAuth
)


export default authRouter