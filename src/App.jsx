import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import Hero from "./components/Hero"
import ItemDetailContainer from "./components/ItemDetailContainer"
import {
  Routes,
  Route,
  useLocation,
  matchPath 
} from "react-router-dom";


function App() {
  const location = useLocation()
  const isItemDetail = matchPath("/item/:id", location.pathname)

  return (
    <>
        <NavBar />
        {!isItemDetail && <Hero />}
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/maybelline/:category" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
        </Routes>
    </>
  )
}

export default App
