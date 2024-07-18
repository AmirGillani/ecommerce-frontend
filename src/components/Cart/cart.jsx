import React, { Fragment } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";

import CartItemCard from "../Cart/CartItemCard";

import { addItemsToCart, removeFromCart } from "../../actions/cart-actions";

import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

import "./Cart.css";

let totalPrice = 0;

function Cart() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // ADD MORE ITEM TO CART

  function increaseQuantity(id, quantity, stock) {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
  }

  // REMOVE ITEM FROM CART

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  // DELETE ITEM FROM CART

  function deleteCartItems(id) {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((i) => (
                <div className="cartContainer">
                  <CartItemCard
                    item={i}
                    deleteCartItems={deleteCartItems}
                    key={i.id}
                  />
                  <div className="cartInput">
                    {/* CALL FUNCTION INSIDE ()=> BECASUSE WE ARE CALLING IN MAP */}
                    <button
                      onClick={() => {
                        decreaseQuantity(i.id, i.quantity);
                      }}
                    >
                      -
                    </button>
                    <input type="number" readOnly value={i.quantity} />
                    <button
                      onClick={() => {
                        increaseQuantity(i.id, i.quantity, i.stock);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{i.price * i.quantity}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>

                <p>
                  Rs /{" "}
                  {cartItems.map((item) => {
                    totalPrice = totalPrice + item.price * item.quantity;
                  })}
                  {totalPrice}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
