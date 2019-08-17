import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
// import Logo from "./Logo.jsx";
// import Search from "./Search.jsx";
// import Login from "./Login.jsx";
// import Signup from "./Signup.jsx";
// import Cart from "./Cart.jsx";
// import Banner from "./Banner.jsx";

class Header extends Component {
  logoutHandler = () => {
    this.props.dispatch({
      type: "logout"
    });
  };
  render = () => {
    if (this.props.username === "" || this.props.username === undefined) {
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
            <img src="/upload/13-512.png" width="20px" />
          </NavLink>
        </div>
      );
    } else {
      return (
        <div className="flex container">
          <Link to="/">
            <img src="/assets/logo.jpg" alt="logo" />
          </Link>
          <div>
            <Link to="/search">Search</Link>
          </div>
          <div>
            <Link to="/new-listing">Create Listing</Link>
          </div>
          <div>
            <a>Hi {this.props.firstName.charAt(0).toUpperCase() + this.props.firstName.slice(1)}</a>
            <button onClick={this.logoutHandler}>Logout</button>
          </div>
          <NavLink to="/shopping-cart">
            <img src="/upload/13-512.png" width="20px" />
          </NavLink>
          ({this.props.addToCartItems})
        </div>
      );
    }
  };
}

let mapStateToProps = storeState => {
  return {
    username: storeState.username,
    firstName: storeState.firstName,
    addToCartItems: storeState.addToCartItems
  };
};

let connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;
