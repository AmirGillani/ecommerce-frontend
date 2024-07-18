import React,{Fragment} from 'react';
import MetaData from '../layout/MetaData';
import { Typography } from '@material-ui/core';
import {Link, useNavigate} from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { UseSelector , useDispatch} from 'react-redux';
import "./ConfirmOrder.css";
import { useSelector } from 'react-redux';

let subTotal=0;

function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {currentUser} = useSelector((state)=>state.users);
  const {cartItems, shippingInfo} = useSelector((state)=>state.cart);

  {cartItems && cartItems.map((item)=>{
     subTotal= subTotal+item.price*item.quantity ;

  })}

  
    const shippingCharges = subTotal > 1000 ? 0 : 200;
   
    const tax = subTotal * 0.18;

    const total = tax + shippingCharges + subTotal;

    function submitHandler()
    {
      const data = {
        tax, shippingCharges , total
      };

      sessionStorage.setItem("OrderInfo", JSON.stringify(data));
      
      navigate("/process/payment")
    }

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{currentUser.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phone}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{shippingInfo.address} {shippingInfo.city} {shippingInfo.pin}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              
              {cartItems &&  cartItems.map((item)=> 
                
                  <div >
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.id}`} >
                    {item.name}
                    </Link>
                    <span>
                      
                    {item.quantity} X Rs{item.price} =
                      <b>Rs{item.price * item.quantity}</b>
                    </span>
                  </div>

                )}
               
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>{total}</span>
            </div>

            <button onClick={submitHandler}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Order