import { useDispatch } from "react-redux";
import { createProductApi, getSellerProductsApi } from "../Service/productApi"
import { setProducts } from "../State/productSlice.js"

const useProduct = () => {

    const dispatch = useDispatch();

    const createProductHandler = async ({ title, description, images }) => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);

        images.forEach(image => {
            formData.append('images', image);
        });

        const productData = await createProductApi(formData);
        dispatch(setProducts(productData));
    }

    const SellerProductsHandler = async () => {

        const sellerProductsData = await getSellerProductsApi();
        dispatch(setSellerProducts(sellerProductsData));
    }

    return { createProductHandler, SellerProductsHandler }
}

export default useProduct;