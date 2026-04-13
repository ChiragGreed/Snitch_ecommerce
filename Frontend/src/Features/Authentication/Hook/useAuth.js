import { useDispatch } from "react-redux";
import { registerApi, loginApi } from "../Service/authApi.js"
import { setUser } from "../State/authSlice.js";

const useAuth = () => {

    const dispatch = useDispatch();

    const registerHandler = async ({ fullname, email, contact, password }) => {
        const userData = await registerApi({ fullname, email, contact, password });
        dispatch(setUser(userData.user));
    }

    const loginHandler = async ({ email, password }) => {
        const userData = await loginApi({ email, password });
        dispatch(setUser(userData.user));
    }

    return { registerHandler ,loginHandler}
}

export default useAuth
