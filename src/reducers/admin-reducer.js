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
    EDIT_ORDERS_RESET,
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
    RESET
  } from "../constants/products-constants";
  
  // REDUCER FUNCTION FOR PRODUCTS
  
  export function AdminProductReducer(state = { products: [] }, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case ADMIN_ALL_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        };
      case ADMIN_ALL_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload
        
        };
      case ADMIN_ALL_PRODUCT_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  export function AdminCreateProductReducer(state = { }, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case ADMIN_CREATE_PRODUCT_REQUEST:
        return {
          loading: true,
          success:false
        };
      case ADMIN_CREATE_PRODUCT_SUCCESS:
        return {
          loading: false,
          success:true,
          product: action.payload.product
        
        };
      case ADMIN_CREATE_PRODUCT_FAILURE:
        return {
          loading: false,
          error: action.payload,
          success:false
        };
      default:
        return state;
    }
  }

  export function AdminEditProductReducer(state = { }, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case ADMIN_DELETE_PRODUCT_REQUEST:
        case ADMIN_EDIT_PRODUCT_REQUEST:
        return {
          loading: true,
          success:false
        };
      case ADMIN_DELETE_PRODUCT_SUCCESS:
        case ADMIN_EDIT_PRODUCT_SUCCESS:
        return {
          loading: false,
          success:true,
          
        
        };
      case ADMIN_DELETE_PRODUCT_FAILURE:
        case ADMIN_EDIT_PRODUCT_FAILURE:
        return {
          loading: false,
          error: action.payload,
          success:false
        };
      default:
        return state;
    }
  }

  export function allOrdersReducer(state = { orders: [] }, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case ALL_ORDERS_REQUEST:
        return {
          loading: true,
          orders: [],
        };
      case ALL_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload
        
        };
      case ALL_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }

  export function EditOrdersReducer(state = {  }, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case DELETE_ORDERS_REQUEST:
        case EDIT_ORDERS_REQUEST:
        return {
          loading: true,
          success:false
        };
      case DELETE_ORDERS_SUCCESS:
        case EDIT_ORDERS_SUCCESS:
        return {
          loading: false,
          success: action.payload
        
        };
      case DELETE_ORDERS_FAIL:
        case EDIT_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
          success:false
        };
        case EDIT_ORDERS_RESET:
          return {
            success:false,
            loading:false
          }
      default:
        return state;
    }
  }

  export function adminUsersReducer(state={users : []}, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case ALL_USERS_REQUEST:
       
        return {
          loading: true,
          users:[]
        };
      case ALL_USERS_SUCCESS:
       
        return {
          loading: false,
          users: action.payload
        
        };
      case ALL_USERS_FAILURE:
       
        return {
          loading: false,
          error: action.payload,
          users:[]
        };
        case EDIT_ORDERS_RESET:
          return {
            users:[],
            loading:false
          }
      default:
        return state;
    }
  }

  export function adminEditUsersReducer(state={}, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case EDIT_ALL_USERS_REQUEST:
       case CHANGE_ROLE_REQUEST:
        return {
          loading: true,
          success:false
        };
      case EDIT_ALL_USERS_SUCCESS:
       case CHANGE_ROLE_SUCCESS:
        return {
          loading: false,
          success: action.payload
        
        };
      case EDIT_ALL_USERS_FAILURE:
       case CHANGE_ROLE_FAILURE:
        return {
          loading: false,
          error: action.payload,
          success:false
        };
        case RESET:
          return {
            success:false,
            loading:false
          }
      default:
        return state;
    }
  }

  export function adminProductReviewsReducer(state={reviews:[]}, action) 
  {
  
    // WHEN DISPATCH FUNCTION IS CALLED IT WILL CREATE ACTION OBJ
  
    switch (action.type) {
      case REVIEWS_REQUEST:
        return {
          loading: true,
          reviews:[]
        };
      case REVIEWS_SUCCESS:
      
        return {
          loading: false,
          reviews: action.payload
        
        };
      case REVIEWS_FAILURE:
       
        return {
          loading: false,
          error: action.payload,
          reviews:[]
        };
        case DELETE_REVIEWS_REQUEST:
          return {
            ...state,
            loading: true,
            success:false
          };
        case DELETE_REVIEWS_SUCCESS:
        
          return {
            ...state,
            loading: false,
            success:true
          
          };
        case DELETE_REVIEWS_FAILURE:
         
          return {
            loading: false,
            error: action.payload,
            success:false
          };
        case RESET:
          return {
            reviews:[],
            loading:false
          };

      default:
        return state;
    }
  }