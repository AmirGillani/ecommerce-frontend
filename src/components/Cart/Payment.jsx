// IMPORT BUILT IN MODULES

import React, { Fragment, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// ICONS
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

// USER DEFINED MODULES

import CheckoutSteps from "../Cart/CheckoutSteps";
import MetaData from "../layout/MetaData";
import {placeOrder} from "../../actions/order-actions";

// CUSTOM CSS

import "./payment.css";

const Payment = () => {
  // RETRIVE DATA FROM SESSION STORAGE

  const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();

  // IT WILL USE CLIENT SECRET KEY WHICH IS SENT TO IT BY ELEMENTS TAG

  const elements = useElements();

  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { currentUser } = useSelector((state) => state.users);

  // CREATE ORDER OBJECT

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.total,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.total,
  };

  // CREATE PAYMENT DATA

  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  // SUBMIT HANDLER

  const submitHandler = async (e) => {
    e.preventDefault();

    // DISABLE THE BUTTON

    payBtn.current.disabled = true;

    try {
      const response = await fetch(
        "https://ecommerce-api-two-rust.vercel.app/api/payment/process",
        {
          body: JSON.stringify(paymentData),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const responseData = await response.json();

      // GET CLIENT SECRET

      const client_secret = responseData.client_secret;

      // IF STRIPE AND ELEMENTS WERE EMPTY THEN RETURN FROM FUNCTION

      if (!stripe || !elements) return;

      // USE STRIP CONFIRM PAYMENT METHOD

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: currentUser.name,
            email: currentUser.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pin,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        // IF ERROR OCCOURED IN PAYMENT ENABLE BUTTON AGAIN

        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {

        if (result.paymentIntent.status === "succeeded") {
          // ADD PAYMENT INFO IN ORDER OBJECT

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(placeOrder(order));

          navigate("/order/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      // IF ANY ERROR OCCOURED THEN SHOW ERROR

      payBtn.current.disabled = false;
      alert.error(`Error ${error}`);
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - Rs${orderInfo && orderInfo.total}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
