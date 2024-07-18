import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import {changeRole} from "../../actions/admin-actions";
import SideBar from "./Sidebar";
import Loader from "../loader/Loader";
import {RESET} from "../../constants/products-constants";

function EditUser() {

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [role,setRole]=useState("");
  const id = useParams().id;
  const navigate=useNavigate();
  const alert= useAlert();
  const dispatch= useDispatch();

  const {success,error} = useSelector((state)=>state.adminEditUsers);

  useEffect(()=>{
    if(success)
  {
    alert.success("Updated successfully");
  };
  if(error)
  {
    alert.error("Error while updating");
  };

  },[success,error])
  
  function updateUserSubmitHandler(e)
  {
    e.preventDefault();

    const myForm= {name,email,role};

    dispatch(changeRole(id,myForm));

    dispatch({type:RESET});
    
    navigate("/admin/users");
  };

  return (
    <Fragment>
    <MetaData title="Update User" />
    <div className="dashboard">
      <SideBar />
      <div className="newProductContainer">
      
          <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
            >
              Update
            </Button>
          </form>
     
      </div>
    </div>
  </Fragment>
  )
}

export default EditUser