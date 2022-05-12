import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "../components/Header"
import AllProducts from "../pages/AllProducts/AllProducts"
import LogIn from "../pages/LogIn/LogIn"
import MyProducts from "../pages/MyProducts"
import Profile from "../pages/Pofile"
import ProdInfo from "../pages/ProdInfo"
import Product from "../pages/Product"
import UserCheck from "../pages/UserCheck"
import AddUsers from "../pages/AddUser/Users"
import Cart from "../pages/Cart/Cart"
import Chat from "../pages/Chat/Chat"
import HomePage from "../pages/HomePage/HomePage"
import MyOrders from "../pages/Orders/Orders"

function Router() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Header />}>
                    <Route path='' element={<HomePage />} />
                    <Route path="" element={<UserCheck />} >
                        <Route path='profile' element={<Profile />} />
                        <Route path='addProduct' element={<Product />} />
                        <Route path='myProducts' element={<MyProducts />} />
                        <Route path='product/:id' element={<ProdInfo />} />
                        <Route path='cartItems' element={<Cart />} />
                        <Route path='chat' element={<Chat />} />
                        <Route path='myOrders' element={<MyOrders />} />
                    </Route>
                    <Route path='addUser' element={<AddUsers />} />
                    <Route path='allProducts' element={<AllProducts />} />
                    <Route path='login' element={<LogIn />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>)
} export default Router