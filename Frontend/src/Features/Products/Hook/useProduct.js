import { useDispatch } from "react-redux";
import { createProductApi, getProductApi, getProductsApi, getSellerProductsApi, updateProductApi } from "../Service/productApi"
import { setAllProducts, setProduct } from "../State/productSlice.js"
import { setSellerProducts } from "../State/productSlice.js"

const useProduct = () => {

    const dispatch = useDispatch();

    const createProductHandler = async ({ title, description, price, images }) => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', JSON.stringify(price));


        images.forEach(image => {
            formData.append('images', image);
        });

        const productData = await createProductApi(formData);
        dispatch(setAllProducts(productData));
        return true;
    }

    const SellerProductsHandler = async () => {
        const sellerProductsData = await getSellerProductsApi();
        dispatch(setSellerProducts(sellerProductsData.products));
    }

    const ProductsHandler = async () => {
        const ProductsData = await getProductsApi();
        dispatch(setAllProducts(ProductsData.products));
    }

    const ProductHandler = async ({ productId }) => {
        const ProductData = await getProductApi({ productId });
        dispatch(setProduct(ProductData.product));
    }

    const updateProductHandler = async (productId, title, description, price, images) => {
        const formData = new FormData();

        if (title !== null) formData.append('title', title);
        if (description !== null) formData.append('description', description);
        if (price !== null) formData.append('price', JSON.stringify(price));

        if (images !== null) {

            const existingImages = [...(images.filter(img => !(img instanceof File)))];

            formData.append("existingImages", JSON.stringify(existingImages));

            images.forEach(image => {
                if (image instanceof File) formData.append('images', image);
            })
        }

        const data = await updateProductApi(productId, formData);
        if (data.product) {
            dispatch(setProduct(data.product));
        }
        return true;
    }

    return { createProductHandler, SellerProductsHandler, ProductsHandler, ProductHandler, updateProductHandler }
}

export default useProduct;