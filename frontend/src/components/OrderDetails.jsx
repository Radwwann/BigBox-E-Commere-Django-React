import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderDetails = () => {

    const [order, setOrder] = useState([]);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            const res = await axios.get('/api/orders/')
            setOrder(res.data)
        }
        fetchOrderDetails()
    },[])

  return (
    <>
    <table className="table table-borderless table-shopping-cart">
      {order?.map((item) => (
        <>
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope="col">Product</th>
              <th scope="col" width="120">
                Price
              </th>
              <th scope="col" width="120">
                Status
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
                <var className="price">
                    $
                    {item.user}
                  </var>
                  <figcaption className="info">
                    <h6 className="title text-dark">{item.address_line}</h6>
                  </figcaption>
                </figure>
              </td>
              <td>
                <div className="price-wrap">
                  <var className="price">
                    $
                    {item.total_price}
                  </var>
                </div>
              </td>
              <td className="text-right">
              <div className="price-wrap">
                  <var className="price">
                    $
                    {item.status}
                  </var>
                </div>
              </td>
            </tr>
          </tbody>
        </>
      ))}
    </table>
  </>
  )
}

export default OrderDetails
