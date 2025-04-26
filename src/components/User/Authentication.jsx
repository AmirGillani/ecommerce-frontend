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
  
  // Error handling state
  const [err, setError] = useState(false);
  
  // User and login data states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const { name, email, password } = user;

  // Store states
  const { loading, error, isAuthenticated, currentUser } = useSelector(
    (state) => state.users
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  // Switch tabs for login/register
  function switchTab(e, tab) {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("current user", JSON.stringify({ loading, error, isAuthenticated, currentUser }));
      const redirect = location.search ? location.search.split("=")[1] : "account";
      navigate("/" + redirect);
    }
  }, [isAuthenticated]);

  // Login form submission
  function loginSubmit(e) {
    e.preventDefault();
    const user = { email: loginEmail, password: loginPassword };
    dispatch(loginUser(user));
  }

  // Signup form submission
  function signupSubmit(e) {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", avatar);  // Ensure avatar is a file object
    dispatch(signupUser(myForm));
  }

  // Handle input changes in signup form
  function registerDataChange(e) {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);  // Set file object here
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  }

  // Handle errors
  useEffect(() => {
    setError(error);
  }, [error]);

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
              {/* Toggle buttons */}
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => { switchTab(e, "login"); }}>LOGIN</p>
                  <p onClick={(e) => { switchTab(e, "register"); }}>SIGNUP</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* Login form */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => { setLoginEmail(e.target.value); }}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => { setLoginPassword(e.target.value); }}
                  />
                </div>
                <Link to="/password/forgetpassword">Forget Password</Link>
                <input type="submit" value="login" className="loginBtn" />
              </form>

              {/* Signup form */}
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
                <input type="submit" value="Sign Up" className="loginBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Authentication;

