import { createOrderApi } from "../Services/OrderApi"

const useOrder = () => {


    const createOrderHandler = async (cartId) => {
        const res = await createOrderApi(cartId);
        return res;
    }


    return { createOrderHandler }
}

export default useOrder;