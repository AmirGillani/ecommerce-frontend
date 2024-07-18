import { ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO } from "../constants/products-constants";

export const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {

  switch (action.type) {

    case ADD_TO_CART:

      const newItem = action.payload;

      //   CHECK NEW ITEM IS ALREADY PRESENT IN CART

      const isItemExist = state.cartItems.find((items) => items.id === newItem.id);

      //   IF NEW ITEM IS NOT PRESENT IN CART ITEMS ADD IT OTHER WISE
      //   NOT ADD IT

      if (isItemExist) {

        const newCartItems = state.cartItems.map((items) => {

          if (items.id == isItemExist.id) {
            
            return newItem;

          } else {

            return items;
          }
        })

        return {
          ...state,
          cartItems: newCartItems
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      };

      case REMOVE_CART_ITEM:
        
        return {
          ...state,
          cartItems : state.cartItems.filter((item)=>item.id !== action.payload)
        };

        case SAVE_SHIPPING_INFO:

        return {
          ...state,
          shippingInfo:action.payload
        }

    default:
      return state ;
  }
};
