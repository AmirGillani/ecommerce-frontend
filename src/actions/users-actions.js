import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/products-constants";

export const loginUser = (user) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: LOGIN_REQUEST });

    // INCLUDE CREDENTIALS FOR ACCESSING COOKIES

    const response = await fetch("https://ecommerce-api-two-rust.vercel.app/api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: LOGIN_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const signupUser = (myForm) => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: SIGNUP_REQUEST });

    const response = await fetch("https://ecommerce-api-two-rust.vercel.app/api/users/signup", {
      method: "POST",
      body: myForm,
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: SIGNUP_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  let responseData;

  try {
    dispatch({ type: LOGOUT_REQUEST });

    const response = await fetch("https://ecommerce-api-two-rust.vercel.app/api/users/logout", {
      credentials: "include",
    });

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: error.message });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  let responseData;
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const response = await fetch("https://ecommerce-api-two-rust.vercel.app/api/users/me", {
      credentials: "include",
    });

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: LOAD_USER_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: responseData.message });
  }
};

// Update User
export const updateUser = (formData) => async (dispatch) => {
  let responseData;
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const response = await fetch(
      "https://ecommerce-api-two-rust.vercel.app/api/users/me/updateprofile",
      { method: "PATCH", body: formData, credentials: "include" }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: UPDATE_USER_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: responseData.message });
  }
};

// Update Password
export const updatePassword = (passwords) => async (dispatch) => {
  let responseData;
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const response = await fetch(
      "https://ecommerce-api-two-rust.vercel.app/api/users/password/updatepassword",
      {
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: responseData.message });
  }
};

// Forget Password
export const forgetPassword = (email) => async (dispatch) => {
  let responseData;
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const user = { email: email };

    const response = await fetch(
      "https://ecommerce-api-two-rust.vercel.app/api/users/forgetpassword",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: responseData.message });
  } catch (error) {
    dispatch({ type: FORGET_PASSWORD_FAIL, payload: error.message });
  }
};

// Reset Password
export const resetPassword = (passwords, token) => async (dispatch) => {
  let responseData;
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const response = await fetch(
      `https://ecommerce-api-two-rust.vercel.app/api/users/password/reset/${token}`,
      {
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: responseData.success });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.message });
  }
};
