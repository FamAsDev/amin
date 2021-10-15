import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import Help from "./help/Help";
import History from "./dashboard/History";
import OrderReceived from "./dashboard/OrderReceived";
import Profile from "./dashboard/Profile";
import Checkout from "./dashboard/Checkout";
import { GlobalState } from "../../GlobalState";
import Categories from "./dashboard/Categories";
import CreateProduct from "./dashboard/CreateProduct";
import PrivacyPolicy from "./policy/PrivacyPolicy";

const MainPages = () => {
  // Global State
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;

  return (
    <>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/detail/:id" exact component={DetailProduct} />
        <Route
          path={`${isLogged ? "/" : "/login"}`}
          exact
          component={Products}
        />
        <Route
          path={`${isLogged ? "/" : "/register"}`}
          exact
          component={Products}
        />
        <Route path="/cart" exact component={Cart} />
        <Route path="/history" exact component={History} />
        <Route
          path="/history/:id"
          exact
          component={isLogged ? History : NotFound}
        />
        <Route
          path="/category"
          exact
          component={isAdmin ? Categories : NotFound}
        />
        <Route
          path="/create_product"
          exact
          component={isAdmin ? CreateProduct : NotFound}
        />
        <Route
          path="/edit_product/:id"
          exact
          component={isAdmin ? CreateProduct : NotFound}
        />
        <Route path="/profile" exact component={Profile} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/help" exact component={Help} />
        <Route path="/privacy-policy" exact component={PrivacyPolicy} />
        <Route path={`${"/order-received"}`} exact component={OrderReceived} />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </>
  );
};

export default MainPages;
