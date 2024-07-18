// IMPORT HEADER FILES

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import {
  ProductDetailsReducer,
  ProductReducer,
  ReviewsReducer,
} from "./reducers/product-reducer";

import {
  usersReducer,
  profileReducer,
  forgetPasswordReducer,
} from "./reducers/user-reducer";

import { cartReducer } from "./reducers/cart-reducer";

import {
  orderReducer,
  myOrdersReducer,
  orderDetails,
} from "./reducers/order-reducer";

import {
  AdminProductReducer,
  AdminCreateProductReducer,
  AdminEditProductReducer,
  allOrdersReducer,
  EditOrdersReducer,
  adminUsersReducer,
  adminEditUsersReducer,
  adminProductReviewsReducer
} from "./reducers/admin-reducer";

// CREATE THREE THINGS

// REDUCERS

// GIVE REDUCERES STATES NAMES EG PRODUCTS

const reducer = combineReducers({
  products: ProductReducer,
  productDetails: ProductDetailsReducer,
  users: usersReducer,
  profile: profileReducer,
  forgetpassword: forgetPasswordReducer,
  cart: cartReducer,
  order: orderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetails,
  review: ReviewsReducer,
  adminProducts: AdminProductReducer,
  newProduct: AdminCreateProductReducer,
  isUpdated: AdminEditProductReducer,
  orders: allOrdersReducer,
  editOrder: EditOrdersReducer,
  adminUsers: adminUsersReducer,
  adminEditUsers: adminEditUsersReducer,
  reviews:adminProductReviewsReducer
});

// INITIAL STATE

let initialState = {
  // IF CART ITEMS IS PRESENT THEN STORE IN CART STATE

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  // LOAD LOGIN USER FROM STORAGE
  users: localStorage.getItem("current user")
    ? JSON.parse(localStorage.getItem("current user"))
    : {},
};

// MIDDLE WARES

const middleWare = [thunk];

// CREATE STORAGE

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
