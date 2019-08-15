import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
// import Logo from "./Logo.jsx";
// import Search from "./Search.jsx";
// import Login from "./Login.jsx";
// import Signup from "./Signup.jsx";
// import Cart from "./Cart.jsx";
// import Banner from "./Banner.jsx";

class Header extends Component {
  render = () => {
    if (this.props.loggedIn) {
    }
    return (
      <div className="flex container">
        <Link to="/">
          <img src="/assets/logo.jpg" alt="logo" />
        </Link>
        <div>
          <Link to="/search">Search</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <NavLink to="/shopping-cart/:uid">
          <div></div>
          <img src="/upload/13-512.png" width="20px" />
        </NavLink>
      </div>
    );
  };
}

export default Header;
