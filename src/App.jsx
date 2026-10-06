import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Index from "./pages/Index";
import Product from "./pages/Product";
import Service from "./pages/Service"
import Contact  from "./pages/Contact";
import Cart from "./pages/Cart"
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Admin from "./pages/admin/Admin";

import ProductDetail from "./pages/ProductDetail";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/services" element={<Service/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/register" element={<Auth initialTab="register" />} />
                <Route path="/login" element={<Auth />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;
