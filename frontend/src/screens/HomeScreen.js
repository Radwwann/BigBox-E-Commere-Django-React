import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListProducts from "../components/ListProducts";
import axios from 'axios'
import { ProductContext } from "../context/ProductContext";
import Cart from "../components/Cart";
const HomeScreen = () => {

    const { products, setProducts } = useContext(ProductContext);
    const [slides, setSlides] = useState([]);


    useEffect(() => {
        const fetchProductList = async () => {
            const res = await axios.get('/api/p/')
            setProducts(res.data)
        }
        fetchProductList();
    },[])

    useEffect(()=> {
        const fetchSlides = async () => {
            const res = await axios.get('/api/slides/')
            setSlides(res.data)
        }
        fetchSlides();
    },[])

  return (
    <div className="home-section">
      <section className="section-intro">
          <div
            id="carouselExampleSlidesOnly"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner">
                {slides?.map((slide) => (
                    <div key={slide.id} class="carousel-item active">
                    <img style={{ maxHeight: "400px" }} src={slide.image} class="d-block w-100" alt="..." />
                  </div>
                ))}
            </div>
          </div>
      </section>

      <section className="padding-y">
        <div className="container">
          <header className="section-heading d-flex justify-content-between">
            <h3 className="section-title">Features</h3>
            <Link to='/products'>
                <h3 className="text-danger">More Details</h3>
            </Link>
          </header>
          <div className="row">
            {products.map((product) => (
                <ListProducts key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomeScreen;
