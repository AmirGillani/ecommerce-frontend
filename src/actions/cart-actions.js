import {ADD_TO_CART,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/products-constants";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/products/${id}`);
  
    const responseDAta = await response.json();

    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: responseDAta.product._id,
        name: responseDAta.product.name,
        price: responseDAta.product.price,
        image: responseDAta.product.images[0].url,
        stock: responseDAta.product.stock,
        quantity:quantity
      },
    });
  
    //GET STATE

    const cartItems = getState().cart.cartItems;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

//REMOVE FROM CART

export const removeFromCart = (id) => async (dispatch,getState) => {

  const response = await fetch(`https://ecommerce-api-two-rust.vercel.app/api/products/${id}`);

  const responseDAta = await response.json();

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: responseDAta.product._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo= (data)=>(dispatch, getState)=>{
  dispatch({type:SAVE_SHIPPING_INFO, payload:data});
  localStorage.setItem("shippingInfo", JSON.stringify(getState().cart.shippingInfo));
}