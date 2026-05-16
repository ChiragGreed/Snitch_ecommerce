import { useDispatch } from "react-redux";
import { addItemQuantityApi, addItemToCartApi, getCartItemsAPi, removeItemApi, subItemQuantityApi } from "../Service/cartApi.js";
import { setcartItems, addItemQuantity, subItemQuantity, removeCartItem } from "../State/cartSlice.js";

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
        dispatch(addItemQuantity(itemId));
        return res;
    }

    const subItemQuantityHandler = async (itemId) => {
        const res = await subItemQuantityApi(itemId);
        dispatch(subItemQuantity(itemId));
        return res;
    }

    const removeItemHandler = async (itemId) => {
        const res = await removeItemApi(itemId);
        dispatch(removeCartItem(itemId));
        return res;
    }

    return { addItemToCartHandler, getCartItemsHandler, addItemQuantityHandler, subItemQuantityHandler, removeItemHandler }
}

export default useCart;