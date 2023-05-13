import React, { useState } from "react";

const Cart = () => {
  const [addCart, setAddCart] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  
  const removeItem = (id) => {
    const index = addCart.findIndex((item) => item.id === id);
    const copyCard = [...addCart];

    if (index > -1) {
      copyCard.splice(index, 1);
      setAddCart(copyCard);
      localStorage.setItem("cartItems", JSON.stringify(copyCard));
    }
  };


  return (
    <>
      <table className="table table-borderless table-shopping-cart">
        {addCart?.map((item) => (
          <>
            <thead className="text-muted">
              <tr className="small text-uppercase">
                <th scope="col">Product</th>
                <th scope="col" width="120">
                  Quantity
                </th>
                <th scope="col" width="120">
                  Price
                </th>
                <th scope="col" className="text-right" width="200">
                  {" "}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <figure className="itemside">
                    <div className="aside">
                      <img src={item.image} className="img-sm" />
                    </div>
                    <figcaption className="info">
                      <h6 className="title text-dark">{item.name}</h6>
                    </figcaption>
                  </figure>
                </td>
                <td>{item.quantity}</td>
                <td>
                  <div className="price-wrap">
                    <var className="price">
                      $
                      {item.discount !== 0.0
                        ? item.discount * item.quantity
                        : item.price * item.quantity}
                    </var>
                  </div>
                </td>
                <td className="text-right">
                  <a
                    data-original-title="Save to Wishlist"
                    title=""
                    href=""
                    className="btn btn-light mr-2"
                    data-toggle="tooltip"
                  >
                    {" "}
                    <i className="fa fa-heart"></i>
                  </a>
                  <button
                    className="btn btn-light"
                    onClick={() => removeItem(item.id)}
                  >
                    {" "}
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
    </>
  );
};

export default Cart;
