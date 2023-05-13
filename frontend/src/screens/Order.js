import React from 'react'
import { Link } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails';

const Order = () => {
    return (
        <div>
          <section className="bg-primary padding-y-sm">
            <div className="container">
              <ol className="breadcrumb ondark mb-0">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Orders
                </li>
              </ol>
            </div>
          </section>

          <section className="section-content padding-y">
            <div className="container">
              <div className="row">
                <main className="col-md-9">
                  <div className="card">
                   <OrderDetails />

                  </div>
                </main>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Order
