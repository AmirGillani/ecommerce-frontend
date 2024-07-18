import React, { Fragment, useState } from "react";

// SPEED DIAL 
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

// BACKDROP
import Backdrop from "@material-ui/core/Backdrop";

// ICONS
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// REDIRECTION
import { useNavigate } from "react-router-dom";

//CUSTOM COMPONENTS
import { logoutUser } from "../../actions/users-actions";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";

 function UserOptions({ currentUser })
 {
  
  const [open, setOpen] = useState(false);

  const {cartItems} = useSelector((state)=>state.cart);
  const history = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  // IF CURRENT USER IS ADMIN THEN ADD DASHBOARD AT FRONT OF ARRAY

  if(currentUser)
  {
    if (currentUser.role === "admin") {
      options.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
    }
  }

  function dashboard() {
    history("/admin/dashboard");
  }

  function orders() {
    history("/myorders");
  }
  function account() {
    history("/account");
  }

  function cart()
  {
    history("/cart");
  }
  function logout() {
   
    dispatch(logoutUser());
    localStorage.removeItem("current user");
    history("/");
    
  }


  return (
    <Fragment>

    {/* BACKDROP */}

      <Backdrop open={open} style={{ zIndex: "10" }} />

      {/* SPEED DIAL */}
      
      {currentUser && <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={currentUser.avatar.url ? currentUser.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>}
      
    </Fragment>
  );
};

export default UserOptions;

