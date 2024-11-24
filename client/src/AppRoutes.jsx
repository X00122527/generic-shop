import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Homepage from './components/HomePage/Homepage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import AppPaths from "./lib/appPaths";
import ProductPage from "./components/ProductPage/ProductPage";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Login from "./components/Sign/Login";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Checkout from "./components/Checkout/Checkout";
import Signup from "./components/Sign/Signup";
import UserView from "./components/User/UserView";
import MainContainer from "./components/Container/MainContainer";
import StripeRoute from "./components/Checkout/StripeRoute";

const appearance = {
  theme: 'stripe',
};
const loader = 'auto';


class AppRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar></Navbar>
        <MainContainer>
          <Routes>
            <Route path={AppPaths.HOME} element={<Homepage />} />
            <Route path={AppPaths.PRODUCT} exact element={<ProductPage />} />
            <Route path={AppPaths.SHOP} element={<ProductsPage />} />
            <Route path={AppPaths.LOGIN} element={<Login />} />
            <Route path={AppPaths.SIGN_UP} element={<Signup />} />
            <Route path={AppPaths.CART} element={<ShoppingCart />} />
            <Route path={AppPaths.CHECKOUT} element={<Checkout />} />
            <Route path={AppPaths.USER} element={<UserView />} />
            <Route path="*" element={
              <StripeRoute
                appearance={appearance}
                loader={loader}
               />} >
              </Route>

          </Routes>
        </MainContainer>
        <Footer></Footer>

      </BrowserRouter>
    );
  }
}

export default AppRoutes