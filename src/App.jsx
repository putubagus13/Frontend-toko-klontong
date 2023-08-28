import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/auth/SignUp";
import ForgotRequest from "./pages/auth/ForgotRequest";
import ResetPassowrd from "./pages/auth/ResetPassword";
import Product from "./pages/Product/Product";
import ProductDetail from "./pages/Product/ProductDetail";
import CreateProduct from "./pages/Product/CreateProduct";
import UpdateProduct from "./pages/Product/UpdateProduct";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotRequest />} />
            <Route path="/reset-password" element={<ResetPassowrd />} />
            <Route path="/products" element={<Product />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
