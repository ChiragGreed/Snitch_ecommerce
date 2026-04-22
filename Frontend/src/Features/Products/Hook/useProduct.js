import { useDispatch } from "react-redux";
import { createProductApi, getProductsApi, getSellerProductsApi } from "../Service/productApi"
import { setAllProducts } from "../State/productSlice.js"
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

    return { createProductHandler, SellerProductsHandler, ProductsHandler }
}

export default useProduct;