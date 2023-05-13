import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";


const Product = () => {

    const [product,setProduct] = useState({});
    const {id} = useParams();

    useEffect(() => {
    const fetchSingleProduct = async () => {
        const res = await axios.get(`/api/single/${id}`)
        setProduct(res.data);

    }
    fetchSingleProduct()
    },[id])

  return (
    <div className="home-section">
      <section className="bg-primary padding-y-sm">
        <div className="container">
          <ol className="breadcrumb ondark mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Product
            </li>
          </ol>
        </div>
      </section>


      <SingleProduct />

      <section className="padding-y bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <header className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a
                        href="#"
                        data-bs-target="#tab_specs"
                        data-bs-toggle="tab"
                        className="nav-link active"
                      >
                        Description
                      </a>
                    </li>
                  </ul>
                </header>
                <div className="tab-content">
                  <article
                    id="tab_specs"
                    className="tab-pane show active card-body"
                  >
                    <table className="table border table-hover">
                      <tr>
                        <th> Display Size: </th>{" "}
                        <td> {product.display_size} </td>
                      </tr>
                      <tr>
                        <th> Processor Capacity: </th>{" "}
                        <td> {product.CPU} </td>
                      </tr>
                      <tr>
                        <th> Front Camera: </th>{" "}
                        <td> {product.display_resolution} </td>
                      </tr>
                      <tr>
                        <th> Storage Capacity: </th>{" "}
                        <td> {product.RAM_size} </td>
                      </tr>
                      <tr>
                        <th> Storage Type: </th> <td> SSD </td>
                      </tr>
                      <tr>
                        <th> Graphics </th> <td> {product.GPU} </td>
                      </tr>
                      <tr>
                        <th> Weight </th> <td> {product.weight}</td>
                      </tr>
                    </table>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
