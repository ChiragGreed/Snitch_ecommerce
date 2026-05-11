import { body, param, validationResult } from 'express-validator';


const validationHandler = (req, res, next) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
        return res.status(400).json({ errors: erros.array() })
    }

    next();
}


export const addToCartValidator = [
    param('productId')
        .isMongoId(true)
        .withMessage("ProductId must be a Mongoose Id"),
    param('variantId')
        .isMongoId(true)
        .withMessage("VariantId must be a Mongoose Id"),

    validationHandler
]