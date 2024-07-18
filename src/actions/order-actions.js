import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    
} from "../constants/products-constants";

// Add to Cart
export const placeOrder = (order) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  try {
    const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/orders/create`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: responseDAta,
    });
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      error: err.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDERS_REQUEST });

  try {
    const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/orders/me`, {
      credentials: "include"
    });

    const responseDAta = await response.json();

    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: responseDAta.order,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: err.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  
  dispatch({ type: ORDER_DETAILS_REQUEST });

  try {
    const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/orders/${id}`, {
      credentials: "include"
    });

    const responseDAta = await response.json();

    console.log(responseDAta);
    
    if (!response.ok) {
      throw new Error(responseDAta.message);
    }

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: responseDAta.order,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.message,
    });
  }
};




