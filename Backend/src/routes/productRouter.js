import express from 'express';
import { createProduct, createVariant, deleteVariant, getCategoryProducts, getProduct, getProducts, getSellerProducts, ProductCategorization, updateProduct } from '../controllers/productController.js';
import { authSeller, verifyToken } from '../middlewares/authMiddleware.js';
import multer from 'multer';
import { addToCartValidator } from '../validation/cartValidation.js';
import { protectedRoute } from '../controllers/authController.js';

const ProductRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024
    }, storage: storage
});


ProductRouter.post('/create', authSeller, upload.array('images', 8), createProduct);

ProductRouter.post('/addCategory', authSeller, ProductCategorization);

ProductRouter.post('/createVariant/:productId', authSeller, upload.array('images', 8), createVariant);

ProductRouter.post('/deleteVariant/:productId', authSeller, deleteVariant);

ProductRouter.get('/seller', authSeller, getSellerProducts);

ProductRouter.patch('/seller/:productId', authSeller, upload.array('images', 8), updateProduct);

ProductRouter.get('/', getProducts);

ProductRouter.get('/category/:categoryId', getCategoryProducts);

ProductRouter.get('/:productId', getProduct);


export default ProductRouter;