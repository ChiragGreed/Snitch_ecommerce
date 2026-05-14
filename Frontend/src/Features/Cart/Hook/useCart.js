import { useDispatch } from "react-redux";
import { addItemQuantityApi, addItemToCartApi, getCartItemsAPi, removeItemApi, subItemQuantityApi } from "../Service/cartApi.js";
import { setcartItems } from "../State/cartSlice.js";

const useCart = () => {

    const dispatch = useDispatch();

    const addItemToCartHandler = async (productId, variantId) => {
        const itemAdded = await addItemToCartApi(productId, variantId);
        return itemAdded;
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

    const removeItemHandler = async (itemId) => {
        const res = await removeItemApi(itemId);
        return res;
    }

    return { addItemToCartHandler, getCartItemsHandler, addItemQuantityHandler, subItemQuantityHandler, removeItemHandler }
}

export default useCart;