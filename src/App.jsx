import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css"
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import Hero from "./components/Hero"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Hero />
        <h1 className='d-flex justify-content-center m-5'>Maybelline NewYork</h1>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/maybelline/:category" element={<ItemListContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
