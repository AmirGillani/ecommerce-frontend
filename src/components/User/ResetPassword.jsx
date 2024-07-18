import React,{Fragment,useState,useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate, useParams} from "react-router-dom";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Loader from "../loader/Loader";
import {resetPassword} from "../../actions/users-actions";
import "./ResetPassword.css";

function ResetPassword() {

    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const token = useParams().token;
    
    function resetPasswordSubmit(e)
    {
        e.preventDefault();

        const passwords={password:password,confirmPassword:confirmPassword};

        dispatch(resetPassword(passwords,token))
    };

    const {loading,error,success}= useSelector((state)=>state.forgetpassword);

    useEffect(()=>{

      if(success)
      {
       alert.success("Password updated successfully!!");
       navigate("/")
      }
      if(error)
      {
        alert.error(`Error occoured : ${error}`)
      }
    },[error,success]);

  return (
    <Fragment>
     <MetaData title="Change Password" />
     {loading ?<Loader />:<Fragment>
     <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Password</h2>

              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
     </Fragment>}
          
    </Fragment>
  )
}

export default ResetPassword