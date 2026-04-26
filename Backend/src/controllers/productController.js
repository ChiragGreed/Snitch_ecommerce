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

    let { title, description, price, existingImages } = req.body;

    if (typeof price == 'string') {
        price = JSON.parse(price);
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
