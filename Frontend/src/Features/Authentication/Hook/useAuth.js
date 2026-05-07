import { useDispatch } from "react-redux";
import { registerApi, loginApi, getMeApi, protectedRouteApi, resetPasswordApi, forgotPasswordApi, sessionProtectedRouteApi } from "../Service/authApi.js"
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

    const protectedRouteHandler = async () => {
        try {
            await protectedRouteApi();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    const resetPasswordHandler = async (sessionId, newPassword, confirmPassword) => {
        try {
            const userData = await resetPasswordApi(sessionId, newPassword, confirmPassword);
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

    const sessionProtectedRouteHandler = async () => {
        try {
            await sessionProtectedRouteApi();
            return true;
        }
        catch (error) {
            return false;
        }
    }

    return { registerHandler, loginHandler, forgotPasswordHandler, resetPasswordHandler, getMeHandler, sessionProtectedRouteHandler, protectedRouteHandler }
}

export default useAuth
