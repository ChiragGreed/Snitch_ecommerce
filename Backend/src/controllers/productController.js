import { variantStock } from "../dao/variantStock.dao.js";
import cartModel from "../models/cartModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import ImagetKitUpload from "../services/imagekit.js";
import { notifyRestockSubscribers } from "../services/restockNotification.service.js";

export const createProduct = async (req, res) => {
    const { title, description, category } = req.body;
    let price = req.body.price;

    if (typeof price == 'string') {
        price = JSON.parse(price);
    }

    const imagesUrl = await Promise.all(req.files.map((image) => { return ImagetKitUpload(image.buffer, image.originalname) }));

    const product = await productModel.create({ title, description, category, images: imagesUrl, price, sellerId: req.user });

    res.status(201).json({
        message: "Product created",
        success: true,
        product
    })
}

export const ProductCategorization = async (req, res) => {
    const { name, parent } = req.body;

    if (!name) return res.status(400).json({
        message: "Category name is required",
        success: false,
        error: "Category name is required"
    })

    const category = await categoryModel.create({ name, parent });

    res.status(201).json({
        message: "Category created",
        success: true,
        category
    })

}

export const getCategories = async (req, res) => {
    const categories = await categoryModel.find().sort({ name: 1 }).lean();

    return res.status(200).json({
        success: true,
        categories,
    });
};

export const getCategoryProducts = async (req, res) => {
    const { categoryId } = req.params;

    if (!categoryId) return res.status(400).json({
        message: "CategoryId is required",
        success: false
    })

    console.log(categoryId);

    const products = await productModel.find({ category: categoryId });

    if (!products || products.length == 0) return res.status(200).json({
        message: "No Products in this category",
        success: true,
        products
    })

    return res.status(200).json({
        message: `Fetched all products from catrgoryId: ${categoryId}`,
        success: true,
        products
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


    if (req.files.length > 0) {
        const imagesUrl = await Promise.all(req.files.map((image) => { return ImagetKitUpload(image.buffer, image.originalname) }))
        var images = [...imagesUrl];
    }
    else {
        var images = product.images;
    }

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
    try {
        const { productId } = req.params;

        let { title, description, price, variants, existingImages } = req.body;


        // Validate product ID
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }


        // Parse multipart form data
        if (typeof price === "string") {
            price = JSON.parse(price);
        }

        if (typeof variants === "string") {
            variants = JSON.parse(variants);
        }

        if (typeof existingImages === "string") {
            existingImages = JSON.parse(existingImages);
        }


        // Find product belonging to the logged-in seller
        const product = await productModel.findOne({
            _id: productId,
            sellerId: req.user
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        // Upload newly added images
        const imagesUrl = req.files?.length
            ? await Promise.all(
                req.files.map(image =>
                    ImagetKitUpload(image.buffer, image.originalname)
                )
            )
            : [];


        // Prepare product update fields
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

        updateFields.images = [
            ...(existingImages ?? product.images),
            ...imagesUrl
        ];


        // Update product in database
        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            updateFields,
            {
                new: true,
                runValidators: true
            }
        );


        // Check whether any variant has come back in stock
        if (variants !== undefined) {

            for (const oldVariant of product.variants) {

                const newVariant = updatedProduct.variants.id(
                    oldVariant._id
                );


                // Previously out of stock, now available
                if (
                    newVariant &&
                    oldVariant.stock <= 0 &&
                    newVariant.stock > 0
                ) {
                    try {
                        await notifyRestockSubscribers(
                            updatedProduct,
                            newVariant
                        );

                    } catch (notificationError) {
                        console.error(
                            "Restock notification failed:",
                            notificationError
                        );
                    }
                }
            }
        }


        return res.status(200).json({
            success: true,
            message: "Product Updated",
            updatedProduct
        });

    } catch (error) {
        console.error("Product update error:", error);

        return res.status(500).json({
            success: false,
            message: "Product updation failed",
            error: error.message
        });
    }
};
