import express from 'express';
import { createProduct, createVariant, getProduct, getProducts, getSellerProducts, updateProduct } from '../controllers/productController.js';
import { authSeller } from '../middlewares/authMiddleware.js';
import multer from 'multer';

const ProductRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024
    }, storage: storage
});


ProductRouter.post('/create', authSeller, upload.array('images', 8), createProduct);
ProductRouter.post('/createVariant/:productId', authSeller, upload.array('images', 8), createVariant);
ProductRouter.get('/seller', authSeller, getSellerProducts);
ProductRouter.patch('/seller/:productId', authSeller, upload.array('images', 8), updateProduct);
ProductRouter.get('/:productId', getProduct);
ProductRouter.get('/', getProducts);



export default ProductRouter;