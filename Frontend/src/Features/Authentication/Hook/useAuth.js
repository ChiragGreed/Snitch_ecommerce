import { useDispatch } from "react-redux";
import { registerApi, loginApi, getMeApi, protectedRouteApi } from "../Service/authApi.js"
import { setLoading, setUser } from "../State/authSlice.js";

const useAuth = () => {

    const dispatch = useDispatch();

    const registerHandler = async ({ fullname, email, contact, password }) => {
        try {
            const userData = await registerApi({ fullname, email, contact, password });
            dispatch(setUser(userData.user));
            dispatch(setLoading(true));
        } catch (error) {
            console.error("Register Error: ", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const loginHandler = async ({ email, password }) => {
        try {

            const userData = await loginApi({ email, password });
            dispatch(setUser(userData.user));
            dispatch(setLoading(true));
        } catch (error) {
            console.error("Login Error: ", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const getMeHandler = async () => {
        try {
            const userData = await getMeApi();
            dispatch(setLoading(true));
            dispatch(setUser(userData.user));
            console.log("FINALLY RUNNING");
        } catch (error) {
            return error;
        }
        finally {
            dispatch(setLoading(false));
        }

    }

    const protectedRouteHandler = async () => {
        try {
            await protectedRouteApi();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    return { registerHandler, loginHandler, getMeHandler, protectedRouteHandler }
}

export default useAuth
