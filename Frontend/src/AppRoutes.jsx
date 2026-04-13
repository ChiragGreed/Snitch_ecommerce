import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Features/Authentication/Pages/Register/Register'
import App from './App'
import Login from './Features/Authentication/Pages/Register/Login'

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
