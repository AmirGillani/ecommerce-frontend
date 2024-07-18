import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";

import SideBar from "./Sidebar";
import Loader from "../loader/Loader";
import { getOrderDetails } from "../../actions/order-actions";
import {updateOrder} from "../../actions/admin-actions";
import {EDIT_ORDERS_RESET} from "../../constants/products-constants";
import "./EditOrder.css";

function EditOrder() {

  const navigate = useNavigate();

  const { orderDetails, error, loading } = useSelector(
    (state) => state.orderDetails
  );
  
  const { success, error:editError } = useSelector(
    (state) => state.editOrder
  );

  const dispatch = useDispatch();

  const id = useParams().id;

  const alert = useAlert();

  const [status,setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if(success)
    {
      alert.success("Updated successfully!!");
    }

    if(editError)
    {
      alert.error("Error while editing");
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id,success,editError]);

  function submitHandler(e)
  {
   e.preventDefault();

   dispatch(updateOrder(id, {status:status}));

   //RESET STATE FOR FUTURE EDITING
   dispatch({type:EDIT_ORDERS_RESET});

   navigate("/admin/dashboard");
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
   
          <MetaData title="Process Order" />
          <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
              <div className="confirmOrderPage">
                <div>
                  <div className="confirmshippingArea">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>
                          {orderDetails.user && orderDetails.user.name}
                        </span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {orderDetails.shippingInfo &&
                            orderDetails.shippingInfo.phone}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {orderDetails.shippingInfo &&
                            orderDetails.shippingInfo.address}
                        </span>
                      </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            orderDetails.paymentInfo &&
                            orderDetails.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {orderDetails.paymentInfo &&
                          orderDetails.paymentInfo.status == "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div>
                        <p>Amount:</p>
                        <span>
                          {orderDetails.totalPrice && orderDetails.totalPrice}
                        </span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            orderDetails.user &&
                            orderDetails.orderStatus == "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {orderDetails.orderStatus && orderDetails.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="confirmCartItems">
                    <Typography>Your Cart Items:</Typography>
                    <div className="confirmCartItemsContainer">
                      {orderDetails.orderItems &&
                        orderDetails.orderItems.map((item) => (
                          <div>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                            <span>
                              {`${item.quantity} X ${item.price} = `}
                              <b>Rs/{item.quantity * item.price}</b>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

              {/* NEW PART IS HERE  */}

                <div>
                  <form className="updateOrderForm" onSubmit={submitHandler}>
                    <h1>Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e)=>{setStatus(e.target.value)}}>
                        <option value="">Choose Category</option>

                        {orderDetails.orderStatus == "Processing" && <option value="Shipped">Shipped</option> }
                        
                        {orderDetails.orderStatus == "Shipped" && <option value="Delivered">Delivered</option>}
                        
                      </select>
                    </div>

                    <Button id="createProductBtn" type="submit">
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default EditOrder;
