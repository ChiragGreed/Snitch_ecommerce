import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Features/Authentication/Pages/Register/Register'
import App from './App'
import Login from './Features/Authentication/Pages/Register/Login'
import CreateProduct from './Features/Products/Pages/CreateProduct'

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/product' >
                    <Route path='/product/createProduct' element={<CreateProduct />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
