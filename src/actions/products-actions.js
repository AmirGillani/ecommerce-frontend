import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAILURE,
  ALL_PRODUCT_DETAILS_REQUEST,
  ALL_PRODUCT_DETAILS_SUCCESS,
  ALL_PRODUCT_DETAILS_FAILURE,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
} from "../constants/products-constants";

// METHOD WILL BE CALLED IN PAGES

export const getProducts = (keyword="",currentPage=1,price=[0,300000],category,ratings=0) => async (dispatch) => {
  let responseData;
 
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    // THESE METHODS WILL BE CALLED BY USING USE DISPATCHER THATS WHY
    // WE HAVE TO CALL ASYNC FUNCTION PASS DISPATCH

    let url = `https://ecommerce-api-two-rust.vercel.app/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}`;

    if(category)
    {
       url = `https://ecommerce-api-two-rust.vercel.app/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings=${ratings}`;
    }
    
    const response = await fetch(url);

    responseData = await response.json();

    // IF SERVER HAS THROWN ERROr CODE JUMP TO CATCH BLOCK

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    // ELSE PUT THESE PRODUCTS IN STATE

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: responseData });
  } catch (error) {
    dispatch({ type: ALL_PRODUCT_FAILURE, payload: error.message });
  }
};

export function getProductDetails(id) {
  return async function (dispatch) {
    let responseData;

    try {
      dispatch({ type: ALL_PRODUCT_DETAILS_REQUEST });

      // THESE METHODS WILL BE CALLED BY USING USE DISPATCHER THATS WHY
      // WE HAVE TO CALL ASYNC FUNCTION PASS DISPATCH

      const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/products/${id}`);

      responseData = await response.json();

      // IF SERVER HAS THROWN ERROE CODE JUMP TO CATCH BLOCK

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      // ELSE PUT THESE PRODUCTS IN STATE

      dispatch({ type: ALL_PRODUCT_DETAILS_SUCCESS, payload: responseData });
    } catch (error) {
      dispatch({ type:   ALL_PRODUCT_DETAILS_FAILURE
        , payload: error.message });
    }
  };
}

export function addReview(newReview) {

  return async function (dispatch) {

    let responseData;

    try {
      dispatch({ type: ADD_REVIEW_REQUEST });

      // THESE METHODS WILL BE CALLED BY USING USE DISPATCHER THATS WHY
      // WE HAVE TO CALL ASYNC FUNCTION PASS DISPATCH

      const response = await fetch("https://ecommerce-api-two-rust.vercel.app/api/products/review",{method:"PATCH",body:JSON.stringify(newReview),headers:{"Content-Type":"application/json"},credentials:"include"});

      responseData = await response.json();

      // IF SERVER HAS THROWN ERROE CODE JUMP TO CATCH BLOCK

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch({ type: ADD_REVIEW_SUCCESS, payload: responseData.sucess });

    } catch (error) {
      
      dispatch({ type: ADD_REVIEW_FAIL
        , payload: error.message });
    }
  };
}
