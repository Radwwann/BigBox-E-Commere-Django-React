import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";

const Header = () => {
  const { products } = useContext(ProductContext);
  const [role, setRole] = useState({});


  useEffect(() => {
    const fetchUserRole = async () => {
      const res = await axios.get("/api/role/");
      setRole(res.data);
    };
    fetchUserRole();
  }, []);

  return (
    <header className="section-header">
      <section className="header-main">
        <div className="container">
          <div className="row gy-3 align-items-center">
            <div className="col-lg-2 col-sm-4 col-4">
              <a href="/" className="navbar-brand">
                BigBox
              </a>
            </div>
            <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="float-end">
                {role === 1 ? (
                  <a
                    href="http://localhost:8000/admin/"
                    className="btn btn-light"
                  >
                    <i className="fa fa-user"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline-block">Admin</span>
                  </a>
                ) : (
                  <a
                    href="http://localhost:8000/registration/sign-in/"
                    className="btn btn-light"
                  >
                    <i className="fa fa-user"></i>{" "}
                    <span className="ms-1 d-none d-sm-inline-block">
                      Logout
                    </span>
                  </a>
                )}
                <Link to="/checkout" className="btn btn-light">
                  <i className="fa fa-shopping-cart"></i>{" "}
                  <span className="ms-1">My cart </span>
                </Link>
                <Link to="/wishlist" className="btn  btn-light">
                {" "}
                <i className="me-1 fa fa-heart"></i> WishList{" "}
                </Link>
                <Link to="/orders" className="btn  btn-light">
                {" "}
                 History{" "}
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <form action="#" className="">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    style={{ width: "55%" }}
                    placeholder="Search"
                  />
                 
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <nav className="navbar navbar-light bg-white border-top navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler border"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar_main"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar_main">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="dropdown-toggle nav-link"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Laptop
                </Link>
                <ul className="dropdown-menu">
                  {products.map((product) => (
                    <>
                      {product.category === 1 ? (
                        <Link to={`/search/${product.category}`} className="dropdown-item">
                          {product.brand_name}
                        </Link>
                      ) : null}
                    </>
                  ))}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="dropdown-toggle nav-link"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Phones
                </Link>
                <ul className="dropdown-menu">
                  {products.map((product) => (
                    <>
                      {product.category === 2 ? (
                        <Link className="dropdown-item" to="">
                          {product.brand_name}
                        </Link>
                      ) : null}
                    </>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
