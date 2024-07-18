import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, loadUser } from "../../actions/users-actions";
import Loader from "../loader/Loader";

import "./UpdateProfile.css";

function UpdateProfile() 
{

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("./profile.png");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  useEffect(() => {

    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setAvatarPreview(currentUser.avatar.url);
    }

    if (error) {
      alert.error(error);
    }

    if (isUpdated) {

      alert.success("Profile Updated Successfully");

      dispatch(loadUser());

      navigate("/account");
    }
  }, [currentUser,error,isUpdated]);

  function updateProfileDataChange(e) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  }

  function updateProfileSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatarPreview);
    dispatch(updateUser(myForm));
  }

  return (
    <Fragment>
         {loading ? <Loader />:<Fragment>
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>
  
            <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
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
  
              <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div>
              <input type="submit" value="Update" className="updateProfileBtn" />
            </form>
          </div>
        </div>
      </Fragment>}
    </Fragment>
   
    
  );
}

export default UpdateProfile;
