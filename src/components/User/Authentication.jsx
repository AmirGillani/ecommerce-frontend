// BUILT IN MODULES
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

// CUSTOM MODULES
import MetaData from "../layout/MetaData";
import { loginUser, signupUser } from "../../actions/users-actions";
import Loader from "../loader/Loader";
import ErrorModal from "../error-modal/ErrorModal";

// CUSTOM CSS
import "./Authentication.css";
import { Link } from "react-router-dom";

function Authentication() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  // ERROR MODAL HANDLER

  const [err, setError] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  // FETCH DATA FROM STORE

  const { loading, error, isAuthenticated, currentUser } = useSelector(
    (state) => {
      return state.users;
    }
  );

 

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  function switchTab(e, tab) {
    // IF USER CLICK LOGIN THEN SHOW LOGIN FORM
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    // IF USER CLICK SIGNUP THEN SHOW SIGNUP FORM

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  useEffect(() => {

    // IF USER IS AUTHENTICATED THEN REDIRECT HIM TO SHIPPING PAGEIF HE 
    // HAS PRESSED CHECKOUT BUTTON
    
    if (isAuthenticated) {

      localStorage.setItem("current user",JSON.stringify({ loading, error, isAuthenticated, currentUser }));
      
      const redirect = location.search ? location.search.split("=")[1] : "account";

      navigate("/"+redirect);
    }
  }, [isAuthenticated]);

  // LOGIN SUBMIT

  function loginSubmit(e) {
    e.preventDefault();
    const user = { email: loginEmail, password: loginPassword };
    dispatch(loginUser(user));
  }

  // SIGNUP SUBMIT

  function signupSubmit(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", avatar);
    dispatch(signupUser(myForm));
  }

  // WHENEVER USER WRITE SOMETHING IN SIGNUP FORM THIS WILL BE TRIGGERED

  function registerDataChange(e) {
    if (e.target.name === "avatar") {
      // FILE READER API WILL READ FILE AND CAN CONVERT IT INTO URL OR TEXT ETC

      // const fileReader = new FileReader();

      // FILE USER HAS SELECTED IS IN BINARY FORMAT USE READ AS URL
      // TO CONVERT IT INTO HUMAN READABLE URL

      // fileReader.readAsDataURL(e.target.files[0]);

      // ONCE FILE IS READED IT SHOULD ALWAYS USE ON LOAD FUNCTION
      // WHICH WILL GIVE US .RESULT ATTRIBUTE WHICH WE CAN USE

      // fileReader.onload = () => {

      //     // SELECTED FILE URL WILL BE PRESENT IN RESULT

      //     setAvatarPreview(fileReader.result);
      //     setAvatar(fileReader.result);
      // };

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      // PUT CURRENTLY WRITTEN VALUE IN USER OBJECT
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  }

  // SET ERROR STATE DEPENDING UPON STORE ERROR STATE

  useEffect(() => {
    setError(error);
  }, [error]);

  // CLEAR ERROR

  function clearError() {
    setError(false);
  }

  return (
    <Fragment>
      <ErrorModal error={err} onClear={clearError} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login" />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              {/* TOGGLE BUTTONS */}

              <div>
                <div className="login_signUp_toggle">
                  <p
                    onClick={(e) => {
                      switchTab(e, "login");
                    }}
                  >
                    LOGIN
                  </p>
                  <p
                    onClick={(e) => {
                      switchTab(e, "register");
                    }}
                  >
                    SIGNUP
                  </p>
                </div>
                {/* THIS BUTTON IS LINKED WITH SWITCHER TAB */}
                <button ref={switcherTab}></button>
              </div>

              {/* LOGIN FORM */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                  />
                </div>
                <Link to="/password/forgetpassword">Forget Password</Link>
                <input type="submit" value="login" className="loginBtn" />
              </form>

              {/* SIGNUP FORM */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={signupSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <Link to="/password/forgetpassword">Forget Password</Link>
                <input type="submit" value="login" className="loginBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Authentication;
