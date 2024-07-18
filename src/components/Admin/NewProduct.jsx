import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate} from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import {createProduct} from "../../actions/admin-actions";

import "./newProduct.css";

const NewProduct = () => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const [name,setName]= useState("");
  const [price,setPrice]= useState("");
  const [description,setDescription]= useState("");
  const [category,setCategory]= useState("");
  const [stock,setStock]= useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {error,success}= useSelector((state)=>state.newProduct);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Toys",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  function createProductImagesChange(e)
  {
    // CONVERT FILES TO ARRAY

    const files = Array.from(e.target.files);

    // EMPTY THSE TO BEFORE NEW FILES SELECTION

    setImages([]);
    setImagesPreview([]);

    // REPEAT FOR EACH FILE

    files.forEach((file) => {

      // READ FILE

      const reader = new FileReader();

      reader.readAsDataURL(file);

      // PROCESS FILES

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      })

  }

  function submitHandler(e)
  {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  }

  useEffect(()=>{
    if(error)
    {
      alert.error(`Error ${error}`)
    }
    if(success)
    {
      alert.success("Product Added Successfully !!");

      navigate("/admin/dashboard");
    }
    },[error,success])

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input type="text" placeholder="Product Name" value={name} onChange={(e)=>{setName(e.target.value)}} required />
            </div>
            <div>
              <AttachMoneyIcon />
              <input type="number" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}} required />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                cols="30"
                rows="1"
                value={description} onChange={(e)=>{setDescription(e.target.value)}}
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                <option value="">Choose Category</option>

                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input type="number" placeholder="Stock" required value={stock} onChange={(e)=>{setStock(e.target.value)}} />
            </div>

            <div id="createProductFormFile">
              <input type="file" name="avatar" accept="image/*" multiple onChange={createProductImagesChange} />
            </div>

            <div id="createProductFormImage">

            {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
              
            </div>

            <Button id="createProductBtn" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
