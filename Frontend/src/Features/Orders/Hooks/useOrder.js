import { useDispatch } from "react-redux";
import { createOrderApi, getOrderApi } from "../Services/OrderApi"
import { setOrderDets } from "../State/orderSlice";

const useOrder = () => {


    const dispatch = useDispatch();

    const createOrderHandler = async (cartId) => {
        const res = await createOrderApi(cartId);
        dispatch(setOrderDets(res.order));
        return res;
    }

    const getOrderHandler = async () => {
        const res = await getOrderApi();
        dispatch(setOrderDets(res.order));
        return res;
    }


    return { createOrderHandler, getOrderHandler }
}

export default useOrder;