import React, { Component } from "react";

class Footer extends Component {
  render = () => {
    return (
      <div className="flex container">
        <ul>
          CUSTOMER SERVICE
          <li>
            <a>Help/FAQ </a>
          </li>
          <li>
            <a>Returns & Exchange</a>{" "}
          </li>
          <li>
            <a href="http://localhost:4000/shopping-cart">Payement</a>
          </li>
          <li>
            <a href="http://localhost:4000/login">My Account</a>
          </li>
          <li>
            <a>Contact us</a>
          </li>
        </ul>

        <ul>
          FOLLOW US
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
          ABOUT US
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
    );
  };
}

export default Footer;
