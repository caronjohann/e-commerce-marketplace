import React, { Component } from "react";

class Footer extends Component {
  render = () => {
    return (
      <div>
        <hr />
        <div className="flex container footer">
          <ul>
            Customer Service
            <li>
              <a>Help/FAQ </a>
            </li>
            <li>
              <a>Returns & Exchange</a>{" "}
            </li>
            <li>
              <a>Payment</a>
            </li>
            <li>
              <a>My Account</a>
            </li>
            <li>
              <a>Contact us</a>
            </li>
          </ul>

          <ul>
            Follow Us
            <li>
              <a>Youtube </a>
            </li>
            <li>
              <a>Facebook </a>
            </li>
            <li>
              <a>Newsletter </a>
            </li>
          </ul>

          <ul>
            About Us
            <li>
              <a>Office </a>
            </li>
            <li>
              <a>Stores </a>
            </li>
            <li>
              <a>Work with us</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };
}

export default Footer;
