import { useDispatch } from "react-redux";
import { createProductApi } from "../Service/productApi"

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

    return { createProductHandler }
}

export default useProduct;