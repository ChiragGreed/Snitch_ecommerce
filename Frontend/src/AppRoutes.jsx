import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Features/Authentication/Pages/Register/Register'
import App from './App'

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
