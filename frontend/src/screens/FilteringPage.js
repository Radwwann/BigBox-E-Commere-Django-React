import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// set initial state of filteredData, brands, selectedBrands, categories, selectedCategories, rangePrice and areaOfWork 

const FilteringPage = () => {

const [filteredData, setFilteredData] = useState([]);
const [brands, setBrands] = useState([]);
const [selectedBrands, setSelectedBrands] = useState([]);
const [categories, setCategories] = useState([]);
const [selectedCategories, setSelectedCategories] = useState([]);
const [rangePrice, setRangePrice] = useState({ min: 0, max: 5000 });
const [areaOfWork, setAreaOfWork] = useState([])
const [selectedAreaOfWork, setSelectedAreaOfWork] = useState([]);
// fetch data from api and update filteredData state 
useEffect(()=> {
    const fetchFilteredData = async () => {
        const res = await axios.get('/api/p/')
        setFilteredData(res.data)
    }
    fetchFilteredData();
},[])
 // fetch data from api and update areaOfWork state 
useEffect(() => {
    const fetchAOW = async () => {
        const res = await axios.get('/api/aow/')
        setAreaOfWork(res.data)
    }
    fetchAOW();
},[])
 // fetch data from api and update categories
useEffect(()=> {
    const fetchCategories = async () => {
        const res = await axios.get('/api/categories/')
        setCategories(res.data)
    }
    fetchCategories();
},[])

 // fetch data from api and update brands
useEffect(()=> {
    const fetchBrands = async () => {
        const res = await axios.get('/api/brands/')
        setBrands(res.data)
    }
    fetchBrands();
},[])
// Update filtered data based on selected filters
useEffect(() => {
    setFilteredData(prevData => {
        return prevData.filter(item => {
            if (selectedCategories.length && !selectedCategories.includes(item.category)) return false;
            if (selectedBrands.length && !selectedBrands.includes(item.Brand)) return false;
            if (selectedAreaOfWork.length && !selectedAreaOfWork.includes(item.Area_of_work)) return false;
            if (item.price < rangePrice.min || item.price > rangePrice.max) return false;
            return true;
        });
    })
}, [selectedCategories,selectedBrands,rangePrice,selectedAreaOfWork])

console.log(filteredData)
  return (

    <div className="home-section">
      <section className="bg-primary py-5">
        <div className="container">
          <h2 className="text-white">Products</h2>
          <ol className="breadcrumb ondark mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Library</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Data
            </li>
          </ol>
        </div>
      </section>

      <section className="padding-y">
        <div className="container">
          <div className="row">
            <aside className="col-lg-3">
              <button
                className="btn btn-outline-secondary mb-3 w-100  d-lg-none"
                data-bs-toggle="collapse"
                data-bs-target="#aside_filter"
              >
                Show filter
              </button>

              <div id="aside_filter" className="collapse card d-lg-block mb-5">
                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="#"
                      className="title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside1"
                    >
                      <i className="icon-control fa fa-chevron-down"></i>{" "}
                      Categories
                    </a>
                  </header>
                  <div className="collapse show" id="collapse_aside_brands">
                    <div className="card-body">
                    {categories?.map((category,id)=> (
                      <label className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={category.id}
                          onChange={e => setSelectedCategories(e.target.value)}

                        />
                        <span key={id} className="form-check-label"> {category.category_name} </span>
                      </label>
                    ))}

                    </div>
                  </div>
                </article>

                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="#"
                      className="title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside1"
                    >
                      <i className="icon-control fa fa-chevron-down"></i>{" "}
                      Area Of Work
                    </a>
                  </header>
                  <div className="collapse show" id="collapse_aside_brands">
                    <div className="card-body">
                    {areaOfWork?.map((area,id)=> (
                      <label className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={area.id}
                          onChange={e => setSelectedAreaOfWork(e.target.value)}

                        />
                        <span key={id} className="form-check-label"> {area.name_of_area} </span>
                      </label>
                    ))}

                    </div>
                  </div>
                </article>


                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="#"
                      className="title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside_brands"
                    >
                      <i className="icon-control fa fa-chevron-down"></i> Brands
                    </a>
                  </header>
                  <div className="collapse show" id="collapse_aside_brands">
                    <div className="card-body">
                    {brands?.map((brand,id)=> (
                      <label className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={brand.id}
                          onChange={e => setSelectedBrands(e.target.value)}

                        />
                        <span key={id} className="form-check-label"> {brand.brand_name} </span>
                      </label>
                    ))}

                    </div>
                  </div>
                </article>

                <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="#"
                      className="title"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside2"
                    >
                      <i className="icon-control fa fa-chevron-down"></i> Price
                    </a>
                  </header>
                  <div className="collapse show" id="collapse_aside2">
                    <div className="card-body">
                      <input
                        type="range"
                        className="form-range"
                        min={0}
                        max={5000}
                        value={rangePrice.min}
                        onChange={e => setRangePrice({ ...rangePrice, min: e.target.value })}
                      />
                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="min" className="form-label">
                            Min
                          </label>
                          <input
                            className="form-control"
                            id="min"
                            value={rangePrice.min}
                            type="number"
                          />
                        </div>

                        <div className="col-6">
                          <label htmlFor="max" className="form-label">
                            Max
                          </label>
                          <input
                            className="form-control"
                            id="max"
                            value={rangePrice.max}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </aside>
            <main className="col-lg-9">
              <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">{filteredData?.length > 0 ? filteredData.length +
                ' Items found ' : 'No Items Found'}</strong>
                <div className="ms-auto ">
                  <select className="form-select d-inline-block w-auto me-1">
                    <option value="0">Best match</option>
                    <option value="1">Recommended</option>
                    <option value="2">High rated</option>
                    <option value="3">Randomly</option>
                  </select>
                  <div className="btn-group">
                    <a
                      href="#"
                      className="btn btn-light"
                      data-bs-toggle="tooltip"
                      title="List view"
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                    <a
                      href="#"
                      className="btn btn-light active"
                      data-bs-toggle="tooltip"
                      title="Grid view"
                    >
                      <i className="fa fa-th"></i>
                    </a>
                  </div>
                </div>
              </header>

              <div className="row">
                {filteredData?.map((product, id) => (
                  <div key={id} className="col-lg-4 col-md-6 col-sm-6">
                    <figure className="card card-product-grid">
                      <div className="img-wrap">
                        <img src={product.image} alt={product.Product_Name} />
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

                        <a href="#" className="btn btn-primary">
                          Add to cart
                        </a>
                        <a href="#" className="btn btn-light btn-icon">
                          {" "}
                          <i className="fa fa-heart"></i>{" "}
                        </a>
                      </figcaption>
                    </figure>
                  </div>
                ))}
            </div>

              <hr />

              <footer className="d-flex mt-4">
                <nav className="ms-3">
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item active" aria-current="page">
                      <span className="page-link">2</span>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </footer>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilteringPage;
