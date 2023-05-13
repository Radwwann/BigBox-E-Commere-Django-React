import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
/*This code defines a functional React component called "Search" which maps through the products in the context 
and displays details of a product if the product's "Brand" value matches the "q" value obtained from the URL parameters. 
The component is a grid of product cards displaying details such as image, price, product name, and an option to add to favorites.
 The component returns a section with a container
 that maps through the products and renders details of the product if the condition is met. */
const Search = () => {
  const { q } = useParams();
  const { products } = useContext(ProductContext);
  return (
    <section className="padding-y">
      <div className="container">
        {products.map((product) => (
          <>
            {product.Brand === Number(q) ? (
              <div key={product.Brand} className="col-lg-3 col-md-6 col-sm-6">
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

                    <a href="#" className="btn btn-light btn-icon">
                      {" "}
                      <i className="fa fa-heart"></i>{" "}
                    </a>
                  </figcaption>
                </figure>
              </div>
            ) : null}
          </>
        ))}
      </div>
    </section>
  );
};

export default Search;
