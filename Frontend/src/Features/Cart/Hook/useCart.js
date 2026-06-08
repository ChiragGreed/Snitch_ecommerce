import { useDispatch } from "react-redux";
import { addItemQuantityApi, addItemToCartApi, getCartItemsAPi, removeItemApi, subItemQuantityApi, createOrderPaymentApi, verifyPaymentApi } from "../Service/cartApi.js";
import { setcartItems, setSubtotal, settotal, addItemQuantity, subItemQuantity, subtractSubtotal, subtractTotal, removeCartItem, addSubtotal, addtotal, setCurrency } from "../State/cartSlice.js";

const useCart = () => {

    const dispatch = useDispatch();

    const addItemToCartHandler = async (productId, variantId) => {
        const itemAdded = await addItemToCartApi(productId, variantId);
        return itemAdded;
    }

    const getCartItemsHandler = async () => {
        const cartItemsData = await getCartItemsAPi();
        console.log(cartItemsData);
        dispatch(setSubtotal(cartItemsData.cart.totalPrice.amount));
        dispatch(settotal(cartItemsData.cart.totalPrice.amount));
        dispatch(setCurrency(cartItemsData.cart.totalPrice.currency));
        dispatch(setcartItems(cartItemsData.cart));
    }

    const addItemQuantityHandler = async (itemId) => {
        const res = await addItemQuantityApi(itemId);
        dispatch(addItemQuantity(itemId));
        dispatch(addSubtotal(itemId));
        dispatch(addtotal(itemId));
        return res;
    }

    const subItemQuantityHandler = async (itemId) => {
        const res = await subItemQuantityApi(itemId);
        dispatch(subItemQuantity(itemId));
        dispatch(subtractSubtotal(itemId));
        dispatch(subtractTotal(itemId));
        return res;
    }

    const removeItemHandler = async (itemId) => {
        const res = await removeItemApi(itemId);
        dispatch(removeCartItem(itemId));
        return res;
    }


    const createOrderPaymentHandler = async (amount, currency) => {
        const res = await createOrderPaymentApi(amount, currency);
        console.log(res);
        return res.order;
    }

    const verifyPaymentHandler = async ({ orderId, paymentId, paymentSignature }) => {
        const res = await verifyPaymentApi({ orderId, paymentId, paymentSignature });
        return res.success;
    }

    return { addItemToCartHandler, getCartItemsHandler, addItemQuantityHandler, subItemQuantityHandler, removeItemHandler, createOrderPaymentHandler, verifyPaymentHandler }
}

export default useCart;