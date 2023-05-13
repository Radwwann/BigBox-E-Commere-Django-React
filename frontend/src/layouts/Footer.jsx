import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-section">
      <footer className="section-footer bg-gray-light">
        <div className="container">
          <section className="footer-main padding-y">
            <div className="row">
              <aside className="col-12 col-sm-12 col-lg-4">
                <article className="me-lg-4">
                  <p className="mt-3">
                    {" "}
                    © 2023- Big Box. <br /> All rights reserved By Radwan Salameh{" "}
                  </p>
                </article>
              </aside>
              <aside className="col-6 col-sm-4 col-lg-4">
                <h6 className="title">Store</h6>
                <ul className="list-menu mb-4">
                  <li>
                    {" "}
                    <Link href="#">Laptops</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="#">Phones</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="#">Sales</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="#">About us</Link>
                  </li>
                </ul>
              </aside>
              <aside className="col-12 col-sm-12 col-lg-4">
              <h6 class="text-uppercase fw-bold">BIGBOX</h6>
            
            <p>
              BIGBOX is an e-commerce website that specializes in selling the best laptops and phones. We understand the importance of finding the right device that meets your needs and budget. Thank you for choosing BIGBOX for all your tech needs!
            </p>
              </aside>
            </div>
          </section>

          <section className="footer-bottom d-flex justify-content-lg-between border-top">
            <div>
              <i className="fab fa-lg fa-cc-visa"></i>
              <i className="fab fa-lg fa-cc-amex"></i>
              <i className="fab fa-lg fa-cc-mastercard"></i>
              <i className="fab fa-lg fa-cc-paypal"></i>
            </div>
          </section>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
