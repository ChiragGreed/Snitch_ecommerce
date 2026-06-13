import express from 'express';
import { addItemToCart, getCartItems, addItemQuantity, subItemQuantity, removeItem, createPaymentOrder, verifyPayment } from '../controllers/cartController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addToCartValidator, cartItemValidator } from '../validation/cartValidation.js';
import { createOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/createOrder', verifyToken, createOrder);

export default orderRouter;