import { useDispatch } from "react-redux";
import { registerApi, loginApi, getMeApi, protectedRouteApi, resetPasswordApi, forgotPasswordApi, checkSessionIdApi, logoutApi } from "../Service/authApi.js"
import { setLoading, setUser } from "../State/authSlice.js";

const useAuth = () => {

    const dispatch = useDispatch();

    const registerHandler = async ({ fullname, email, contact, password, role }) => {
        try {
            const userData = await registerApi({ fullname: fullname.trim(), email: email.trim().toLowerCase(), contact: contact.trim(), password: password.trim(), role });
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
            return true;
        } catch (error) {
            console.error("Login Error: ", error);
            return false;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const logoutHandler = async () => {

        const userData = await logoutApi();
        dispatch(setUser(null));
        dispatch(setLoading(true));
        dispatch(setLoading(false));

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

    const resetPasswordHandler = async (newPassword, confirmPassword) => {
        try {
            const userData = await resetPasswordApi(newPassword, confirmPassword);
            return userData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const forgotPasswordHandler = async (clientEmail) => {
        try {
            await forgotPasswordApi(clientEmail);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const getMeHandler = async () => {
        try {
            const userData = await getMeApi();
            dispatch(setLoading(true));
            dispatch(setUser(userData.user));
        } catch (error) {
            return error;
        }
        finally {
            dispatch(setLoading(false));
        }

    }

    const checkSessionIdHandler = async () => {
        try {
            await checkSessionIdApi();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    return { registerHandler, loginHandler, logoutHandler, forgotPasswordHandler, resetPasswordHandler, getMeHandler, checkSessionIdHandler, protectedRouteHandler }
}

export default useAuth
