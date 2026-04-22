import { useDispatch } from "react-redux";
import { createProductApi, getSellerProductsApi } from "../Service/productApi"
import { setProducts } from "../State/productSlice.js"
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
        dispatch(setProducts(productData));
        return true;
    }

    const SellerProductsHandler = async () => {
        const sellerProductsData = await getSellerProductsApi();
        // console.log(sellerProductsData.products);
        dispatch(setSellerProducts(sellerProductsData.products));
    }

    return { createProductHandler, SellerProductsHandler }
}

export default useProduct;