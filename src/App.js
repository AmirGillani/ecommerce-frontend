import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./components/layout/Header";
import UserOptions from "./components/layout/UserOptions";
import Footer from "./components/layout/Footer";
import webFont from "webfontloader";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/product";
import Products from "./components/Product/products";
import Search from "./components/Search/Search.jsx";
import Login from "./components/User/Authentication.jsx";
import Account from "./components/User/Account.jsx";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgetPassword from "./components/User/ForgetPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/cart";
import Shipping from "./components/Cart/Shipping";
import Order from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Orders/MyOrders";
import OrderDetails from "./components/Orders/OrderDetails";
import Payment from "./components/Cart/Payment";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminProducts from "./components/Admin/ProductList";
import OrderList from "./components/Admin/OrderList";
import NewProduct from "./components/Admin/NewProduct";
import EditProduct from "./components/Admin/EditProduct.jsx";
import EditOrder from "./components/Admin/EditOrder.jsx";
import Users from "./components/Admin/Users.jsx";
import EditUser from "./components/Admin/EditUser.jsx";
import Reviews from "./components/Admin/Reviews.jsx";
import NotFound from "./components/layout/NotFound";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";

function App() {
  // USERS HOOK IS UNIVERSAL HOOK THATS WHY WE WILL CALL IT IN APP

  const { isAuthenticated, currentUser } = useSelector((state) => state.users);

  // GET STRIPE PACKAGE API KEY FROM BACKEND

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const response = await fetch(
      "https://ecommerce-api-two-rust.vercel.app/api/payment/stripeapikey",
      { credentials: "include" }
    );

    const responseData = await response.json();

    setStripeApiKey(responseData.stripeApiKey);

    
  }

  useEffect(() => {
    // LOAD FONTS

    webFont.load({ google: { families: ["Roboto", "Lucida Sans"] } });

    // IF IS AUTHENTICATED IS TRUE THEN LOAD USER



      getStripeApiKey();
    
  }, [isAuthenticated]);

  // PREVENT USER TO OPEN INSPECT ELEMENT

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      {/* HEADER BAR */}

      <Header />

      {/* SHOW USER ICON AND OPTIONS IF HE IS LOGIN */}

      {isAuthenticated && <UserOptions currentUser={currentUser} />}

      <Routes>
        {/* UN PROCTED ROUTES */}

        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route exact path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/notfound" Component={NotFound} />
        <Route
          exact
          path="/password/forgetpassword"
          Component={ForgetPassword}
        />
        <Route
          exact
          path="/password/resetpassword/:token"
          Component={ResetPassword}
        />
        <Route exact path="/cart" Component={Cart} />

        {/* PROTECTED ROUTES */}
        {isAuthenticated && <Route exact path="/account" Component={Account} />}
        {isAuthenticated && (
          <Route exact path="/me/update" Component={UpdateProfile} />
        )}
        {isAuthenticated && (
          <Route exact path="/password/update" Component={UpdatePassword} />
        )}
        {isAuthenticated && (
          <Route exact path="/shipping" Component={Shipping} />
        )}
        {isAuthenticated && (
          <Route exact path="/order/confirm" Component={Order} />
        )}

        {isAuthenticated && <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          }
        /> }

        {isAuthenticated && <Route exact path="/order/success" Component={OrderSuccess} />}
        
        {isAuthenticated && <Route exact path="/myorders" Component={MyOrders} />}

        {isAuthenticated && <Route exact path="/order/:id" Component={OrderDetails} />}

        {/* ADMIN ROUTES */}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/dashboard" Component={AdminDashboard} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/products" Component={AdminProducts} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/product" Component={NewProduct} />}
        
        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/product/:id" Component={EditProduct} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/orders" Component={OrderList} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/editorder/:id" Component={EditOrder} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/users" Component={Users} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/user/:id" Component={EditUser} />}

        {isAuthenticated && currentUser && currentUser.role == "admin" && <Route exact path="/admin/reviews" Component={Reviews} />}

        {/* DEFAULT URL FOR V6 */}

        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
