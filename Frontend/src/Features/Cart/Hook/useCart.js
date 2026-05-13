import { useDispatch } from "react-redux";
import { addItemToCartApi, getCartItemsAPi } from "../Service/cartApi.js";
import { setcartItems } from "../State/cartSlice.js";

const useCart = () => {

    const dispatch = useDispatch();

    const addItemToCartHandler = async (productId, variantId) => {
        const response = await addItemToCartApi(productId, variantId);
        return response;
    }

    const getCartItemsHandler = async () => {
        const cartItemsData = await getCartItemsAPi();
        dispatch(setcartItems(cartItemsData.cart));

    }

    return { addItemToCartHandler, getCartItemsHandler }
}

export default useCart;