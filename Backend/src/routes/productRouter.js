import express from 'express';
import { createProduct } from '../controllers/productController.js';

const ProductRouter = express.Router();

ProductRouter.get('/create',createProduct);



export default ProductRouter;