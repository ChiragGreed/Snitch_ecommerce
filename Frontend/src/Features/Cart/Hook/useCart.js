import { useDispatch } from "react-redux";
import { addItemQuantityApi, addItemToCartApi, getCartItemsAPi, subItemQuantityApi } from "../Service/cartApi.js";
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

    const addItemQuantityHandler = async (itemId) => {

        const res = await addItemQuantityApi(itemId);
        console.log(res);
    }

    const subItemQuantityHandler = async (itemId) => {

        const res = await subItemQuantityApi(itemId);
        return res
    }

    return { addItemToCartHandler, getCartItemsHandler, addItemQuantityHandler, subItemQuantityHandler }
}

export default useCart;