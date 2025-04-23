import {
  ADMIN_ALL_PRODUCT_REQUEST,
  ADMIN_ALL_PRODUCT_SUCCESS,
  ADMIN_ALL_PRODUCT_FAILURE,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAILURE,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAILURE,
  ADMIN_EDIT_PRODUCT_REQUEST,
  ADMIN_EDIT_PRODUCT_SUCCESS,
  ADMIN_EDIT_PRODUCT_FAILURE,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  DELETE_ORDERS_FAIL,
  EDIT_ORDERS_REQUEST,
  EDIT_ORDERS_SUCCESS,
  EDIT_ORDERS_FAIL,
  ALL_USERS_FAILURE,
  ALL_USERS_SUCCESS,
  ALL_USERS_REQUEST,
  EDIT_ALL_USERS_FAILURE,
  EDIT_ALL_USERS_SUCCESS,
  EDIT_ALL_USERS_REQUEST,
  CHANGE_ROLE_FAILURE,
  CHANGE_ROLE_SUCCESS,
  CHANGE_ROLE_REQUEST,
  REVIEWS_FAILURE,
  REVIEWS_SUCCESS,
  REVIEWS_REQUEST,
  DELETE_REVIEWS_FAILURE,
  DELETE_REVIEWS_SUCCESS,
  DELETE_REVIEWS_REQUEST,
} from "../constants/products-constants";

// METHOD WILL BE CALLED IN PAGES

export const getProducts = () => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: ADMIN_ALL_PRODUCT_REQUEST });

    const response = await fetch("https://ecommerce-api-two-rust.vercel.app/api/products/admin/", {
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({
      type: ADMIN_ALL_PRODUCT_SUCCESS,
      payload: responseData.products,
    });
  } catch (error) {
    dispatch({ type: ADMIN_ALL_PRODUCT_FAILURE, payload: error.message });
  }
};

export const createProduct = (newProduct) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });

    const response = await fetch(
      "https://ecommerce-api-two-rust.vercel.app/api/products/addproduct",
      {
        method: "POST",
        body: newProduct,
        credentials: "include",
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({
      type: ADMIN_CREATE_PRODUCT_SUCCESS,
      payload: responseData.product,
    });
  } catch (error) {
    dispatch({ type: ADMIN_CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });

    const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/products/${id}`, {
      method: "DELETE",

      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS,
      payload: responseData.success,
    });
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: ADMIN_EDIT_PRODUCT_REQUEST });

    const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/products/${id}`, {
      method: "PATCH",

      body: data,

      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({
      type: ADMIN_EDIT_PRODUCT_SUCCESS,
      payload: responseData.success,
    });
  } catch (error) {
    dispatch({ type: ADMIN_EDIT_PRODUCT_FAILURE, payload: error.message });
  }
};

export const allOrders = () => async (dispatch) => {
  dispatch({ type: ALL_ORDERS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/orders/admin/orders`,
      {
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: responseDAta.orders,
    });
  } catch (err) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: err.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ORDERS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/orders/admin/${id}`,
      {
        method:"DELETE",
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: DELETE_ORDERS_SUCCESS,
      payload: responseDAta.succes,
    });
  } catch (err) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: err.message,
    });
  }
};

export const updateOrder= (id,myForm) => async (dispatch) => {
  dispatch({ type: EDIT_ORDERS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/orders/admin/${id}`,
      {
        method:"PATCH",
        body:JSON.stringify(myForm),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: EDIT_ORDERS_SUCCESS,
      payload: responseDAta.succes,
    });
  } catch (err) {
    dispatch({
      type: EDIT_ORDERS_FAIL,
      payload: err.message,
    });
  }
};

export const getAllUsers= () => async (dispatch) => {
  dispatch({ type: ALL_USERS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/users/admin/allusers`,
      {
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: responseDAta.users,
    });
  } catch (err) {
    dispatch({
      type: ALL_USERS_FAILURE,
      payload: err.message,
    });
  }
};

export const deleteUser= (id) => async (dispatch) => {
  dispatch({ type: EDIT_ALL_USERS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/users/admin/${id}`,
      {
        method:"DELETE",
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: EDIT_ALL_USERS_SUCCESS,
      payload: responseDAta.success,
    });
  } catch (err) {
    dispatch({
      type: EDIT_ALL_USERS_FAILURE,
      payload: err.message,
    });
  }
};

export const changeRole= (id,myForm) => async (dispatch) => {
  dispatch({ type: CHANGE_ROLE_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/users/admin/${id}`,
      {
        method:"PATCH",
        body:JSON.stringify(myForm),
        headers:{"Content-Type":"application/json"},
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: CHANGE_ROLE_SUCCESS,
      payload: responseDAta.success,
    });
  } catch (err) {
    dispatch({
      type: CHANGE_ROLE_FAILURE,
      payload: err.message,
    });
  }
};

export const getReviews= (id) => async (dispatch) => {
  dispatch({ type: REVIEWS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/products/reviews?productid=${id}`,
      { 
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: REVIEWS_SUCCESS,
      payload: responseDAta.reviews,
    });
  } catch (err) {
    dispatch({
      type: REVIEWS_FAILURE,
      payload: err.message,
    });
  }
};

export const deleteReviews= (productid,reviewid) => async (dispatch) => {
  dispatch({ type: DELETE_REVIEWS_REQUEST });

  try {
    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/products/reviews?productid=${productid}&reviewid=${reviewid}`,
      { 
        method:"DELETE",
        credentials: "include",
      }
    );

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: DELETE_REVIEWS_SUCCESS,
      payload: responseDAta.success,
    });
  } catch (err) {
    dispatch({
      type: DELETE_REVIEWS_FAILURE,
      payload: err.message,
    });
  }
};
