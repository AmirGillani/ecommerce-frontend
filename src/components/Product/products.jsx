// BUILT IN MODULES
import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
// INSTALL MATERIAL UI 4 PACKAGES WRITTEN IN PACKAGE JASON FILE
// WHILE INSTALLING WRITE --legacy-peer-deps WITH THEM
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";


// CUSTOM MODULES
import MetaData from "../layout/MetaData";
import { getProducts } from "../../actions/products-actions";
import Products from "../Home/Products";
import Loader from "../loader/Loader";
import ErrorModal from "../error-modal/ErrorModal";

// CUSTOM CSS
import "./Products.css";

// ALL CATEGORIES
const categories = ["Laptop", "Toys", "Shoes", "Mobile"];

function AllProducts() {
  // ERROR MODAL HANDLER

  const [err, setError] = useState(false);

  // FOR PRICE FILTER

  const [price, setPrice] = useState([0, 300000]);

  // RATINGS

  const [ratings, setRatings] = useState(0);

  // FOR CATEGORY FILTER

  const [category, setCategory] = useState("");

  // FOR PAGINATION

  const [currentPage, setCurrentPage] = useState("");

  // FOR SEARCH BOX

  const keyword = useParams().keyword;

  const dispatch = useDispatch();

  // CALL GET ALL PRODUCTS ACTION METHOD PASS ALL PROPS

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price, category,ratings));
  }, [dispatch, keyword, currentPage, price, category,ratings]);

  // GET PRODUCT STATE

  const { products, productCount, productPerPage, loading, error } =
    useSelector((state) => {
      return state.products;
    });

  // SET ERROR STATE DEPENDING UPON STORE ERROR STATE

  useEffect(() => {
    setError(error);
  }, [error]);

  // CLEAR ERROR

  function clearError() {
    setError(false);
  }

  // GET CURRENTLY CLICKED PAGE NUMBER

  function setCurrentPageNo(event) {
    setCurrentPage(event);
  }

  // SET MAX AND MIN PRICE

  function priceChangeHandler(event, newPrice) {
    setPrice(newPrice);
  }

  return (
    <Fragment>
      <ErrorModal error={err} onClear={clearError} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products" />
          <h1 className="productsHeading">Products</h1>

          {/* PRODUCTS */}

          <div className="products">
            {products &&
              products.map((product) => {
                return <Products key={product._id} product={product} />;
              })}
          </div>


          <div className="filterBox">
            {/* PRICE RANGE SLIDER */}

            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceChangeHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            {/* CATEGORIES */}

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => {
                return (
                  <li
                    className="category-link"
                    key={category}
                    onClick={() => {
                      setCategory(category);
                    }}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>

            {/* RATINGS FILTER */}

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {/* PAGINATION */}

          {productPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default AllProducts;
