import express from 'express';
import { addItemToCart, getCartItems, addItemQuantity, subItemQuantity, removeItem } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addToCartValidator, cartItemValidator } from '../validation/cartValidation.js';

const cartRouter = express.Router();

cartRouter.get('/items', verifyToken, cartItemValidator, getCartItems);

cartRouter.post('/add/:productId/:variantId', verifyToken, addToCartValidator, addItemToCart);

cartRouter.post('/addItemQuantity', verifyToken, cartItemValidator, addItemQuantity);

cartRouter.post('/subItemQuantity', verifyToken, cartItemValidator, subItemQuantity);

cartRouter.post('/removeItem', verifyToken, cartItemValidator, removeItem);


export default cartRouter;