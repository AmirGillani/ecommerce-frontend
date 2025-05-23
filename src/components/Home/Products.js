import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import useWindowWidth from "../Home/useWidth";
function Products({ product }) {

  const width = useWindowWidth();

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: width < 600 ? 30 : 25,
    value: product.ratings,
    isHalf: true,
  };
  
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>Reviews({product.numOfReviews})</span>
      </div>
      <span>Rs/{product.price}</span>
    </Link>
  );
}

export default Products;
