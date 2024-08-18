import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer/ItemListContainer"
import Hero from "./components/Hero"
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer"
import Cart from './components/Cart/Cart'
import CheckoutContainer from './components/CheckoutContainer'
import Footer from './components/Footer'
import LoginContainer from './components/login/LoginContainer'
import Orders from './components/Orders'

import {
  Routes,
  Route,
  useLocation,
  matchPath 
} from "react-router-dom";


function App() {
  const location = useLocation()
  const isItemDetail = matchPath("/item/:id", location.pathname)
  const isCart = matchPath("/cart", location.pathname)
  const isChk = matchPath("/checkout", location.pathname)
  const login = matchPath("/login", location.pathname)
  const order = matchPath("/orders", location.pathname)

  return (
    <>
        {!login && <NavBar />}
        {!isItemDetail && !isCart && !isChk && !login && !order && <Hero />}
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/maybelline/:category" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        {!isItemDetail && !login && <Footer/>}
    </>
  )
}

export default App
