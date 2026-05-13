import express from 'express';
import { addItemToCart, getCartItems } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addToCartValidator } from '../validation/cartValidation.js';

const cartRouter = express.Router();

cartRouter.get('/items', verifyToken, getCartItems);

cartRouter.post('/add/:productId/:variantId', verifyToken, addToCartValidator, addItemToCart);




export default cartRouter;