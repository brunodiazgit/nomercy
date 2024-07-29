import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import Hero from "./components/Hero"
import ItemDetailContainer from "./components/ItemDetailContainer"
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'
import Footer from './components/Footer'

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

  return (
    <>
        <NavBar />
        {!isItemDetail && !isCart && !isChk && <Hero />}
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/maybelline/:category" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
        {!isItemDetail && <Footer/>}
    </>
  )
}

export default App
