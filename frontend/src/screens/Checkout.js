import React from "react";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";




//This code is setting up a Checkout page. It is first 
//retrieving the cart items from localStorage and converting 
//it to a JSON object. Then it is using reduce to loop through the cart items and calculate the total price of the
// items in the cart. If an item has a discount, it will use that discounted price, otherwise it will use the regular price of 
//the item. The totalPrice variable will hold the sum of all 
//prices for each item in the cart.
const Checkout = () => {
    const addCart = JSON.parse(localStorage.getItem("cartItems")) || []
    const totalPrice = addCart.reduce((acc, item) => {
        let itemPrice = 0;
        if(item.discount) {
            itemPrice = Number(item.discount) * item.quantity;
            return acc + itemPrice;
        } else {
            itemPrice = Number(item.price) * item.quantity;
            return acc + itemPrice;
        }

      }, 0);
    const shippingFee = 25;
    const tax = totalPrice * 0.11;
    const discount = totalPrice * 0.25;
    const finalPrice = totalPrice + shippingFee + tax - discount;
  return (
    <div>
      <section className="bg-primary padding-y-sm">
        <div className="container">
          <ol className="breadcrumb ondark mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shopping Cart
            </li>
          </ol>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
               <Cart />

                <div className="card-body border-top">
                  <Link to='/order' className="btn btn-primary float-md-right">
                    {" "}
                    Make Purchase <i className="fa fa-chevron-right"></i>{" "}
                  </Link>
                  <Link to='/' className="btn btn-light">
                    {" "}
                    <i className="fa fa-chevron-left"></i> Continue shopping{" "}
                  </Link>
                </div>
              </div>

              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Free Delivery
                  within 1-2 weeks
                </p>
              </div>
            </main>
            <aside className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">USD {totalPrice}</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Shipping Fee:</dt>
                    <dd className="text-right">USD {shippingFee}</dd>
                  </dl>
                      <dl className="dlist-align">
                    <dt>Tax:</dt>
                    <dd className="text-right">% 11</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Discount:</dt>
                    <dd className="text-right">% 24</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right  h5">
                      <strong>${finalPrice}</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="images/payments.webp" height="26"  alt=''/>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
