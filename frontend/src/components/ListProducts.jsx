import axios from "axios";
import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";


const ListProducts = ({ product }) => {

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const addToCart = async (id) => {
    const item = {
      product: product.id,
      name: product.Product_Name,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      discount: product.price_after_discount,
      id
    };
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
        cartItems = cartItems.map((x) => (x.product === existItem.product ? {...x, quantity: x.quantity + 1} : x));
    } else {
        cartItems = [...cartItems, item]
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  const addToWishlist = async (id) => {
    const item = {
      product: product.id,
      name: product.Product_Name,
      image: product.image,
      price: product.price,
      quantity: product.quantity,
      discount: product.price_after_discount,
      id
    };
    const existItem = wishlistItems.find((x) => x.product === item.product);
    if (existItem) {
       alert('Whislist Already Exist');
    } else {
        wishlistItems = [...wishlistItems, item]
    }
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  };
  console.log(product)

  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <figure className="card card-product-grid">
          <div className="img-wrap">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.Product_Name} />
            </Link>
          </div>
          <figcaption className="info-wrap border-top">
            <div className="price-wrap">
              {product.discount_percentage !== "0.00" ? (
                <>
                  <span
                    className="price"
                    style={{ textDecoration: "line-through" }}
                  >
                    {product.price}$
                  </span>
                  <span className="ms-3 text-warning">
                    {product.price_after_discount}$
                  </span>
                </>
              ) : (
                <span className="price">{product.price}$</span>
              )}
            </div>
            <p className="title mb-2">{product.Product_Name}</p>
            <button
              href="#"
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to cart
            </button>
            <button onClick={() => addToWishlist(product.id)} className="btn btn-light btn-icon">
              {" "}
              <i className="fa fa-heart"></i>{" "}
            </button>
          </figcaption>
        </figure>
      </div>
    </>
  );
};

export default ListProducts;
