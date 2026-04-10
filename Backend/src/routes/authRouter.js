import express from 'express';
import { login, register } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validation/authValidation.js';

const authRouter = express.Router();

authRouter.post('/register', registerValidator, register);

authRouter.post('/login', loginValidator, login);


export default authRouter