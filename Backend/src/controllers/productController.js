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
    const price = req.body.price || product.price;

    if (req.body.price) {
        price = JSON.parse(price);
    }

    const imagesUrl = await Promise.all(req.files.map((image) => { return ImagetKitUpload(image.buffer, image.originalname) }))

    const images = [...imagesUrl];

    const newVariant = [...product.variants, { attribute, images, price, stock }];
// Mujhe push vali approch try krnit hai 
// https://www.google.com/search?q=why+this+error+CastError%3A+Cast+to+embedded+failed+for+value+%7B+attribute%3A+%7B+color%3A+red+%7D%2C+images%3A+%5B+https%3A%2F%2Fik.imagekit.io%2Flfqmv9rcq%2FSnitch%2FProducts%2FScreenshot_2026-04-13_210848_GP9eMRBYzb.png+%5D%2C+price%3A+%7B+amount%3A+6899%2C+currency%3A+INR+%2C+_id%3A+new+ObjectId%28+69ec776e79ba7ce0e4f43e9b+%29+%7D%2C+stock%3A+0+%7D+%28type+Object%29+at+path+variants+because+of+CastError&sca_esv=6dd148a2df4a2bfc&sxsrf=ANbL-n4kqmzrrDmW2aMwuuCg_MYdMPkPbw%3A1777114841710&source=hp&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3tR7kVu8a3MULVA9bsoO0mCCFiZoMv28ux3eOJ39Q_ixnRJO66C0xBAUoovRT1WiWc2wxNjs2dVEyHrCoGo856EpETgVR969UYyuERa8kxh5cbF1pplYbyQG2Wrvvm6Xcn4EUy6OtZW0DbuVqZV2omfZMmB8jz2e6x3wpB3R-ziGWrtgDg&aep=1&ntc=1&sa=X&ved=2ahUKEwjBm_XW7IiUAxXkcWwGHWgFOc4Q2J8OegQIEBAI&biw=1536&bih=776&dpr=1.25&mstk=AUtExfAbAf2brYIXGRKGHoilRWlt-qxfSr6pDxpolWe_xwgQMc7rLEi4cl38Mn9YtdrJMr39uAx-FJFmGa-2F8DymOUHnr5RCWhnud55Br-0doP3qddAM6L0LjJlobUxzdTXthPvs7OojlZvts-rBeI_NEJ7SZxGP4A0rEm-k7iHABa3Fif3fQwew1SvgyVnYNqH06YeDy9VptltkPFcPaoDT35liWunjJ7etNym4E4zDLefgS62ECasCe323q3SrbrV90_FdFfbmW2x0nmQabKvrzJYMLzS2IzGVTX4UIEqLdFyOWIFe-zMjoTQ9fJtNyU-QM37suiIrTUfxg&csuir=1&mtid=3Z7saYT6JOOQseMP1Mfz4AY&udm=50
    await productModel.findByIdAndUpdate(productId, { variants: newVariant })

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
