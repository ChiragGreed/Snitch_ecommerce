import { variantStock } from "../dao/variantStock.dao.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import ImagetKitUpload from "../services/imagekit.js";

export const createProduct = async (req, res) => {
    const { title, description } = req.body;
    let price = req.body.price;

    if (typeof price == 'string') {
        price = JSON.parse(price);
    }

    const imagesUrl = await Promise.all(req.files.map((image) => { return ImagetKitUpload(image.buffer, image.originalname) }));

    const product = await productModel.create({ title, description, images: imagesUrl, price, sellerId: req.user });

    res.status(201).json({
        message: "Product created",
        success: true,
        product
    })
}

export const createVariant = async (req, res) => {

    const { productId } = req.params;

    if (!productId) return res.status(400).json({
        message: "Product Id is missing",
        success: false,
        error: "Product Id not found in params"
    });

    const product = await productModel.findOne({ _id: productId, sellerId: req.user });

    if (!product) return res.status(404).json({
        message: "Product not found",
        success: false,
        error: "Product not found"
    })

    const attribute = JSON.parse(req.body.attribute);
    const stock = req.body.stock || 0;
    let price = req.body.price || product.price;

    if (req.body.price) {
        price = JSON.parse(price);
    }

    const imagesUrl = await Promise.all(req.files.map((image) => { return ImagetKitUpload(image.buffer, image.originalname) }))

    const images = [...imagesUrl];

    product.variants.push({ attribute, images, price, stock });

    await product.save();

    res.status(201).json({
        message: "Product Variant created",
        success: true
    })

}

export const deleteVariant = async (req, res) => {


    const { productId } = req.params;
    const { variantId } = req.body;
    console.log(variantId);

    if (!productId) return res.status(400).json({
        message: "Product Id is missing",
        success: false,
        error: "Product Id not found in params"
    });

    const product = await productModel.findOne({ _id: productId, sellerId: req.user });

    if (!product) return res.status(404).json({
        message: "Product not found",
        success: false,
        error: "Product not found"
    })

    variantId.forEach(deleteReq => {

        const variantIdx = product.variants.findIndex(variant => variant._id == deleteReq);

        if (variantIdx != -1) product.variants.splice(variantIdx, 1);

    });

    await product.save();

    res.status(201).json({
        message: "Product Variant deleted",
        success: true,
        product
    })

}

export const getSellerProducts = async (req, res) => {
    const products = await productModel.find({ sellerId: req.user });

    if (!products) return res.status(404).json({
        message: "No products found for Seller with userId: " + req.user,
        success: false,
        error: "No products found"
    })

    res.status(201).json({
        message: "Products fetched of Seller with userId: " + req.user,
        success: true,
        products
    })
}

export const getProducts = async (req, res) => {
    const products = await productModel.find();

    if (!products) return res.status(404).json({
        message: "No products found",
        success: false,
        error: "No products found"
    })

    res.status(201).json({
        message: "Fetched all products",
        success: true,
        products
    })
}

export const getProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await productModel.findOne({ _id: productId });

    if (!product) return res.status(404).json({
        message: "Product not found",
        success: false,
        error: "Product not found"
    })

    res.status(201).json({
        message: "Fetched product details",
        success: true,
        product
    })
}

export const updateProduct = async (req, res) => {
    const { productId } = req.params;

    if (!productId) return res.status(400).json({
        message: "Product Id is missing",
        success: false,
        error: "Product Id not found in params"
    })

    let { title, description, price, variants, existingImages } = req.body;

    if (typeof price == 'string') {
        price = JSON.parse(price);
    }

    if (typeof variants == 'string') {
        variants = JSON.parse(variants);
    }

    if (existingImages) {
        existingImages = JSON.parse(existingImages);
    }

    const imagesUrl = req.files?.length ? await Promise.all(req.files.map((image) => { return ImagetKitUpload(image.buffer, image.originalname) })) : [];

    const product = await productModel.findOne({ _id: productId, sellerId: req.user });

    if (!product) return res.status(404).json({
        message: "Product not found",
        success: false,
        error: "No product found by the this product Id"
    })


    const updateFields = {};

    if (title !== undefined) {
        updateFields.title = title;
    }

    if (description !== undefined) {
        updateFields.description = description;
    }

    if (price !== undefined) {
        updateFields.price = price;
    }

    if (variants !== undefined) {
        updateFields.variants = variants;
    }

    updateFields.images = [...existingImages, ...imagesUrl];


    let updatedProduct;

    try {
        updatedProduct = await productModel.findByIdAndUpdate(productId, updateFields);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "Product updation failed",
            success: false,
            err: err
        })
    }

    res.status(200).json({
        message: "Product Updated",
        success: true,
        updatedProduct
    })

}

export const addItemToCart = async (req, res) => {

    const userId = req.user;

    const { productId, variantId } = req.params;
    const { quantity } = req.body;


    if (!productId || !variantId) return res.status(400).json({
        message: "ProductId or VariantId not found",
        succees: false,
        err: "ProductId or VariantId missing in params"
    })

    const product = await productModel.findOne({ _id: productId, 'variants._id': variantId });

    if (!product) return res.status(404).json({
        message: "Product variant do not exist",
        succees: false,
        err: "Product variant do not exist"
    })

    let cart = await cartModel.findOne({ userId, 'items.productId': productId, 'items.variantId': variantId });

    if (!cart) {

        const stock = await variantStock(productId, variantId);

        if (quantity > stock) return res.status(400).json({
            message: "Insuffecient stock for required item quantity",
            success: false,
        })

        cart = await cartModel.create({ userId, items: [{ productId, variantId, quantity }] });

        return res.status(200).json({
            message: "Item added to cart",
            succees: true
        })
    }


    const ExistingQuantity = cart.items.find((item) => item.productId == productId && item.variantId).quantity;

    const stock = await variantStock(productId, variantId);

    if ((ExistingQuantity + quantity) > stock) return res.status(400).json({
        message: "Can not add items more than available stock",
        success: false,
    })

    cart.items.forEach(item => {
        if (item.productId == productId && item.variantId == variantId) item.quantity++;
    });


    await cart.save();

    res.status(200).json({
        message: "Item added to cart",
        succees: true
    })

}