import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Features/Authentication/Pages/Register'
import App from './App'
import Login from './Features/Authentication/Pages/Login'
import CreateProduct from './Features/Products/Pages/CreateProduct'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import SellerProducts from './Features/Products/Pages/SellerProducts'
import ProductDetail from './Features/Products/Pages/ProductDetail'
import SellerProductDetail from './Features/Products/Pages/SellerProductDetail'
import ResetPassword from './Features/Authentication/Pages/ResetPassword'
import ForgotPassword from './Features/Authentication/Pages/ForgotPassword'
import Cart from './Features/Cart/Pages/Cart'
import ProtectedRoute from './Features/Authentication/components/ProtectedRoute'
import SellerProtected from './Features/Authentication/components/SellerProtected'
import AppLayout from './AppLayout'
import MyOrders from './Features/Orders/Pages/MyOrders'

const AppRoutes = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<App />} />
                    <Route path='/product/:productId' element={<ProductDetail />} />
                    <Route path='/cart' element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
                    <Route path='/myOrders' element={<ProtectedRoute> <MyOrders /> </ProtectedRoute>} />
                </Route>



                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/resetPassword' element={<ResetPassword />} />

                <Route path='/product' >
                    <Route path='/product/createProduct' element={<SellerProtected> <CreateProduct /> </SellerProtected>} />
                    <Route path='/product/sellerProducts' element={<SellerProtected> <SellerProducts /> </SellerProtected>} />
                    <Route path='/product/sellerProducts/:productId' element={<SellerProtected> <SellerProductDetail /> </SellerProtected>} />
                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
