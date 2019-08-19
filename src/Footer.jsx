import React, { Component } from "react";

class Footer extends Component {
  render = () => {
    return (
      <div>
        <hr />
        <div className="flex container footer">
          <ul>
            <li>
              <p className="footer-title">Customer Service</p>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Return Policy</a>
            </li>
            <li>
              <a>Payments</a>
            </li>
            <li>
              <a>My Account</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
          </ul>

          <ul>
            <li>
              <p className="footer-title">Follow Us</p>
            </li>
            <li>
              <a>Instagram</a>
            </li>
            <li>
              <a>Twitter</a>
            </li>
            <li>
              <a>Facebook</a>
            </li>
            <li>
              <a>Pinterest</a>
            </li>
          </ul>

          <ul>
            <li>
              <p className="footer-title">About Us</p>
            </li>
            <li>
              <a>Office </a>
            </li>
            <li>
              <a>Affiliates </a>
            </li>
            <li>
              <a>Work with us</a>
            </li>
          </ul>
        </div>
        <div className="container">
          <p>Back to Top</p>
          <p className="footer-copy">
            &copy; 2019 Trade Market – All Rights Reserved
          </p>
        </div>
      </div>
    );
  };
}

export default Footer;
