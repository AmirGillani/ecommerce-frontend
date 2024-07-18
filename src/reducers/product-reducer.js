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
  NEW_REVIEW_RESET
} from "../constants/products-constants";

// REDUCER FUNCTION FOR PRODUCTS

export function ProductReducer(state = { products: [] }, action) 
{

  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCount: action.payload.productCount,
        productPerPage: action.payload.productPerPage
      };
    case ALL_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

// REDUCER FUNCTION FOR PRODUCTS
  
export function ProductDetailsReducer(state = { productDetails: {} }, action) 
{

  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {

      case ALL_PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          productDetails: {},
        };
      case ALL_PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          productDetails: action.payload.product
        };
      case ALL_PRODUCT_DETAILS_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
}

// REDUCER FUNCTION FOR REVIEWS
  
export function ReviewsReducer(state = { }, action) 
{

  // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ

  switch (action.type) {

      case ADD_REVIEW_REQUEST:
        return {
          ...state,
          loading: true         
        };
      case ADD_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload
        };
      case ADD_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case NEW_REVIEW_RESET:
          return {
            ...state,
            success: false,
          };
    default:
      return state;
  }
}
