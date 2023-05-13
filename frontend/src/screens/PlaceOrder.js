import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const generateInvoiceNumber = () => {
    return Math.floor(Math.random() * 100000);
  };

  const navigate = useNavigate();

  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber());
  const addCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  let itemId = 1
  const totalPrice = addCart.reduce((acc, item) => {
    const itemPrice = Number(item.price) * item.quantity;
    itemId = item.product;
    return acc + itemPrice;
  }, 0);
  const shippingFee = 25;
  const tax = totalPrice * 0.11;
  const discount = totalPrice * 0.25;
  const finalPrice = (totalPrice + shippingFee + tax - discount).toFixed(2);;
  const [formData, setFormData] = useState({
    // shipping address info
    // ------------------
    // use /api/createshippingaddress/ (post) to create one
    address_line: "",
    city: "Beirut",
    country: "Lebanon",
    phone_number: "70xxxxxx",

    // order info
    // -------
    // use /api/getuserid/ to get user id
    user: 1,
    // after creating shipping address with above data it will
    // return the item created , use the id field for shipping
    // address here
    total_price: finalPrice,
    order_status: "Pending",
    status:"paid",

    // order details info
    // -----------------
    // use /api/createorderdetail/ (post) to create
    // this one
    //
    // after creating order in top use its id here
    product_price: totalPrice,
    // use the product id
    product_id: 1,
    product_quantity: 1,
  });

  const getTokenFromCookie = () => {
    const cookie = document.cookie;
    const token = cookie.split(";").find(c => c.trim().startsWith("csrftoken="));
    if (!token) return null;
    return token.split("=")[1];
  };

  const token = getTokenFromCookie();

  console.log(token)

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
    e.preventDefault();

    // const shippingAddressData = {
    //     "address_line": formData.address_line,
    //     "city": formData.city,
    //     "country": formData.country,
    //     "phone_number": formData.phone_number
    // };

    try {
        const res = await axios.post("/api/createorder/", formData , {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': token
              }

        });
        localStorage.removeItem('cartItems');
        navigate('/')
    } catch (err) {
            console.error(err);
            navigate('/checkout')
    };


};

  return (
    <section className="order-form m-4">
      <div className="container pt-4">
        <div className="row">
          <div className="col-12 px-4">
            <h1>Order:#{invoiceNumber}</h1>
            <hr className="mt-1" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-lg-8">
              <div className="row mx-4">
                <div className="col-sm-6">
                  <div className="form-outline">
                    <label className="form-label" for="form1">
                      User
                    </label>
                    <input
                      type="text"
                      id="user"
                      value={formData.user}
                      disabled
                      className="form-control order-form-input"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-outline">
                    <label className="form-label" for="form1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      value={formData.country}
                      disabled
                      className="form-control order-form-input"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-outline">
                    <label className="form-label" for="form1">
                      Address Line
                    </label>
                    <input
                      type="text"
                      id="address_line"
                      value={formData.address_line}
                      onChange={handleChange}
                      className="form-control order-form-input"
                    />
                  </div>
                </div>
                <div className="col-sm-6 mt-2 mt-sm-0">
                  <div className="form-outline">
                    <label className="form-label" for="form2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      disabled
                      className="form-control order-form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3 mx-4">
                <div className="col-12">
                  <label className="order-form-label">Phone number</label>
                </div>
                <div className="col-12">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="form-control order-form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-3 mx-4"></div>

              <div className="row mt-3">
                <div className="col-12">
                  <button
                    type="submit"
                    id="btnSubmit"
                    className="btn btn-primary d-block mx-auto btn-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              {/* <div className="col-12 px-4">
                <h1>Payment Option</h1>
                <hr className="mt-1" />
              </div> */}
              <div className="form-outline">
                <select
                  value={formData.payment}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option hidden>Select Your Payment</option>
                  <option value="0">PayPal</option>
                  <option value="1">Cash On Delivery</option>
                </select>
              </div>
              <aside className="col-md-12 mt-5">
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
                      <img src="images/payments.webp" height="26" alt="" />
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
