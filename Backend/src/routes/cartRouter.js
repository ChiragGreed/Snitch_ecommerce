import express from 'express';
import { addItemToCart, getCartItems, addItemQuantity, subItemQuantity, removeItem } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addToCartValidator } from '../validation/cartValidation.js';

const cartRouter = express.Router();

cartRouter.get('/items', verifyToken, getCartItems);

cartRouter.post('/add/:productId/:variantId', verifyToken, addToCartValidator, addItemToCart);

cartRouter.post('/addItemQuantity', verifyToken, addItemQuantity);

cartRouter.post('/subItemQuantity', verifyToken, subItemQuantity);

cartRouter.post('/removeItem', verifyToken, removeItem);


export default cartRouter;