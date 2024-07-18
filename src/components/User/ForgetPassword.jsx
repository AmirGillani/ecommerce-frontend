import React, { useEffect, useState, Fragment } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {forgetPassword} from "../../actions/users-actions";
import Loader from "../loader/Loader";
import MetaData from "../layout/MetaData";
import "./ForgotPassword.css";

function ForgetPassword() {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const {error,loading,message}=useSelector((state)=>state.forgetpassword);

  useEffect(()=>{
    if(message)
    {
      alert.success("Email Sent Successfully");
    }
    if(error)
    {
      alert.error(`${error}`);
    }
        
},[error,message]);

  function forgotPasswordSubmit(e) {

    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  return (
    <Fragment>
      {loading ? <Loader /> : <Fragment>
      <MetaData title="Forgot Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </Fragment> }
    </Fragment>
   
  );
}

export default ForgetPassword;
