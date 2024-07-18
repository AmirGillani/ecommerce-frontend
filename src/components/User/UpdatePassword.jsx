import React,{Fragment, useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { updatePassword } from "../../actions/users-actions.js";
import Loader from "../loader/Loader";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useAlert } from "react-alert";
import "./UpdatePassword.css";

function UpdatePassword() {

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const dispatch =useDispatch();
  const alert = useAlert();
  const navigate =useNavigate();
  const [oldPassword, setOldPassword]= useState("");
  const [newPassword, setNewPassword]= useState("");
  const [confirmPassword, setConfirmPassword]= useState("");

  function updatePasswordSubmit(e)
  {
    e.preventDefault();

   const passwords={oldpassword:oldPassword,newpassword:newPassword,confirmpassword:confirmPassword}

    dispatch(updatePassword(passwords));
   
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      navigate("/account");

    }
  }, [error, alert, navigate, isUpdated]);

  return  <Fragment>
  {loading ? (
    <Loader />
  ) : (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>

          <form
            className="updatePasswordForm"
            onSubmit={updatePasswordSubmit}
          >
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old Password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              value="Change"
              className="updatePasswordBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  )}
</Fragment>
}

export default UpdatePassword