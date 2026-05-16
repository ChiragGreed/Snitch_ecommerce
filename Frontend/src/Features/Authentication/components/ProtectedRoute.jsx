import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate();
    const { getMeHandler } = useAuth();

    const User = useSelector(state => state.auth.User);
    const Loading = useSelector(state => state.auth.Loading);

    useEffect(() => {
        const getUser = async () => {
            await getMeHandler();
        }
        getUser();
    }, []);

    useEffect(() => {
        if (Loading === false && User === null) {
            navigate("/login");
            return;
        }

    }, [User, Loading]);

    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute
