import { useEffect, useState } from "react";
import useAuth from "./Features/Authentication/Hook/useAuth"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const App = () => {

  const navigate = useNavigate();
  const { getMeHandler, protectedRouteHandler } = useAuth();
  const User = useSelector((state) => { return state.auth.User });
  const Loading = useSelector((state) => { return state.auth.Loading });


  useEffect(() => {
    const checkAuth = async () => {
      const storedtoken = await protectedRouteHandler();
      if (!storedtoken) navigate('/login');
    }

    checkAuth();
  }, []);

  useEffect(() => {
    getMeHandler();
  }, []);

  useEffect(() => {
    if (Loading === false && User === null) {
      navigate('/login');
    }
  }, [User, Loading])


  if (Loading == true) return <div>Loading...</div>


  return (
    <div >
      <h1>Welcome to Snitch</h1>
      <h2>{User?.fullname}</h2>
    </div>
  )
}

export default App