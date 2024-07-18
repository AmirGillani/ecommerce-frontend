import React, { Fragment, useEffect, useState } from "react";
import Products from "../Home/Products";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../actions/products-actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import ErrorModal from "../error-modal/ErrorModal";
import "./Home.css";
function Home() {

  // ERROR MODAL HANDLER

  const [err, setError] = useState(false);

  // USE TO CALL ACTION METHODS

  const dispatch = useDispatch();

  // CALL ACTION METHOD WITH THE HELP OF DISPATCH

  useEffect(() => {
    // SHOW TOP 5 STAR RATINGS PRODUCT ON HOME SCREEN
    dispatch(getProducts());
  }, [dispatch]);

  // FETCH STORED DATA FROM STORAGE

  let { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  // SET ERROR STATE DEPENDING UPON STORE ERROR STATE
  
  useEffect(() => {
    setError(error);
  }, [error]);

   function clearError()
   {
    setError(false);
   }

  return (
    <Fragment>
      <ErrorModal error={err} onClear={clearError}/>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="HOME PAGE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>Scroll</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured products </h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => {
                return <Products key={product._id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
