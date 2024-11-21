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
import OrdersContainer from './components/OrdersContainer'

import {
  Routes,
  Route,
  useLocation,
  matchPath
} from "react-router-dom";


function App() {
  const location = useLocation()
  const isItemDetail = matchPath("/nomercy/item/:id", location.pathname)
  const login = matchPath("/nomercy/login", location.pathname)
  const cart = matchPath("/nomercy/cart", location.pathname)
  const orders = matchPath("/nomercy/orders", location.pathname)

  return (
    <>
      {!login && <NavBar />}
      <Routes>
        <Route path="/nomercy" element={<><Hero /><ItemListContainer /></>} />
        <Route path="/nomercy/category/:category" element={<ItemListContainer />} />
        <Route path="/nomercy/product/:id" element={<ItemDetailContainer />} />
        <Route path="/nomercy/cart" element={<Cart />} />
        <Route path="/nomercy/checkout" element={<CheckoutContainer />} />
        <Route path="/nomercy/login" element={<LoginContainer />} />
        <Route path="/nomercy/orders" element={<OrdersContainer />} />
      </Routes>

      {!login && !cart && !isItemDetail && !orders && <Footer />}
    </>
  )
}

export default App
