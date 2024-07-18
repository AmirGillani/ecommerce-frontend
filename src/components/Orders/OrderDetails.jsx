import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails } from "../../actions/order-actions";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";
import Loader from "../loader/Loader";

import "./orderDetails.css";

const OrderDetails = () => {

  const { orderDetails, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  const id= useParams().id;

  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order # {orderDetails._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{orderDetails.user && orderDetails.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {orderDetails.shippingInfo && orderDetails.shippingInfo.phone}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                  {orderDetails.shippingInfo && orderDetails.shippingInfo.address}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p className={orderDetails.paymentInfo && orderDetails.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"}>
                     {orderDetails.paymentInfo && orderDetails.paymentInfo.status == "succeeded" ? "PAID" :"NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{orderDetails.totalPrice && orderDetails.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p className={orderDetails.user && orderDetails.orderStatus == "Delivered" ? "greenColor" : "redColor"}>
                    {orderDetails.orderStatus && orderDetails.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
              
              {orderDetails.orderItems && orderDetails.orderItems.map((item)=><div >
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.id}`} >
                        {item.name}
                      </Link>
                      <span>
                        {`${item.quantity} X ${item.price} = `}
                        <b>Rs/{item.quantity*item.price}</b>
                      </span>
                    </div>)}
                    
               
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
