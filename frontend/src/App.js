import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Product from "./screens/Product";
import Checkout from "./screens/Checkout";
import { ProductProvider } from "./context/ProductContext";
import axios from "axios";
import FilteringPage from "./screens/FilteringPage";
import PlaceOrder from "./screens/PlaceOrder";
import Search from "./screens/Search";
import WishList from "./screens/WishList";
import Order from "./screens/Order";

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true;


/*ets withCredentials to true, which allows sending credentials with the API requests.
 Then, it defines the App component which
 uses the React Router to render various components like HomeScreen, Product, Checkout */
function App() {
  return (
    <>
    <ProductProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products" element={<FilteringPage />} />
          <Route path="/search/:q" element={<Search />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
    </>
  );
}

export default App;
