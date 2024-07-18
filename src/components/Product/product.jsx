import React, { Fragment, useEffect, useState } from "react";

import { useAlert } from "react-alert";

//PACKAGES FOR ROUTING

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

//PACKAGES FOR SLIDER

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";

import "slick-carousel/slick/slick-theme.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";

//PACKAGE FOR STARS

import ReactStars from "react-rating-stars-component";

//PACKAGE FOR CUSTOM USE

import { getProductDetails,addReview } from "../../actions/products-actions";

import { addItemsToCart } from "../../actions/cart-actions";

import {NEW_REVIEW_RESET} from "../../constants/products-constants";

import Loader from "../loader/Loader";

import ErrorModal from "../error-modal/ErrorModal";

import ReviewCard from "./review-card";

import MetaData from "../layout/MetaData";

//CSS FILES

import "./product-details.css";

function ProductDetails() {
  // ERROR MODAL HANDLER

  const [err, setError] = useState(false);

  let [quantity, setQuantity] = useState(1);

  const [open,setOpen] = useState(false);

  const [review,setReview] = useState("");

  const [ratings,setRatings]= useState(0);

  // FRTCH CURRENT PRODUCT ID

  const params = useParams();

  const alert = useAlert();

  const navigate = useNavigate();

  // CALL GET PRODUCT DETAILS FUNCTION TO GET DATA FROM DB STORE
  // IN REDUX AND USE HERE

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch]);

  // FETCH DATA FROM STORE STATES

  const { isAuthenticated } = useSelector(
    (state) => state.users
  );

  const { productDetails, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.review
  );

  // SETTINGS FOR SLIDER

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  // SETTINGS FOR STARS

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 60 : 25,
    value: productDetails.ratings,
    isHalf: true,
  };

  // SET ERROR STATE DEPENDING UPON STORE ERROR STATE

  useEffect(() => {
    setError(error);
    if(reviewError)
    {
      alert.error("Error while submitting review!!")
    };

    if(success)
    {
     
      alert.success("Reviewed successfully!!!");
      dispatch({type:NEW_REVIEW_RESET});
      window.location.reload();
    }

  }, [error,reviewError,success,productDetails.reviews]);

  function clearError() {
    setError(false);
  }

  function increase() {
    if (productDetails.stock <= quantity) return;
    let q = quantity++;
    setQuantity(q);
  }

  function decrease() {
    if (quantity <= 1) return;
    let q = quantity--;
    setQuantity(q);
  }

  function addToCart() {
    dispatch(addItemsToCart(params.id, quantity));

    alert.success("Added to cart");
  }

  function reviewHandler(e)
  {
     setReview(e.target.value)
  }

  function reviewToggler(e)
  {
    open ? setOpen(false) : setOpen(true)
  }

  function reviewSubmit(e)
  {
    
    const newReview={
      productID:params.id,
      rating:ratings,
      comment:review
    };

    dispatch(addReview(newReview));
    
    setOpen(false)

  }

  return (
    <Fragment>
      <ErrorModal error={err} onClear={clearError} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${productDetails.name} -- Ecommerce`} />
          <div className="ProductDetails">
            {/* SHOW SLIDER */}

            <div className="imgslider">
              <Slider {...settings} className="CarouselImage">
                {productDetails.images &&
                  productDetails.images.map(function (item, index) {
                    return (
                      <img
                        key={item.url}
                        src={item.url}
                        alt={`${index} Slide`}
                      />
                    );
                  })}
              </Slider>
            </div>

            {/* PRODUCT DETAILS BLOCK */}
            <div>
              <div className="detailsBlock-1">
                <h2>{productDetails.name}</h2>
                <p>Product#{productDetails._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({productDetails.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>Rs/{productDetails.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decrease}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increase}>+</button>
                  </div>
                  {productDetails.stock == 0 ? (
                    <button
                      disabled={true}
                      style={{
                        backgroundColor: "gray",
                        color: "white",
                        cursor: "not-allowed",
                        boxShadow: "0px 0px 10px 0px grey",
                      }}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <button onClick={addToCart}>Add To Cart</button>
                  )}
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productDetails.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetails.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{productDetails.description}</p>
              </div>
              {isAuthenticated && <button className="submitReview" onClick={reviewToggler}>Submit Review</button>}
            </div>
          </div>

          {/* SUBMIT REVIEW */}

          <Dialog aria-labelledby="simple-dialog-title" open={open} onCancel={reviewToggler}>

            <DialogTitle>Submit Review</DialogTitle>

            <DialogContent className="submitDialog">

              <Rating  size="large" value={ratings} onChange={(e)=>setRatings(e.target.value)}/>

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={review}
                onChange={reviewHandler}
              ></textarea>

            </DialogContent>

            <DialogActions>
              <Button onClick={reviewToggler}>Cancel</Button>
              <Button onClick={reviewSubmit}>Submit</Button>

            </DialogActions>
          </Dialog>

          {/* IF PRODUCT HAS REVIEWS THEN SHOW REVIEWS ELSE SHOW NO REVIEWS */}

          {productDetails.reviews && productDetails.reviews[0] ? (
            <div className="reviews">
              {productDetails.reviews &&
                productDetails.reviews.map((review) => {
                 return <ReviewCard key={review._id} review={review} />
              })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
