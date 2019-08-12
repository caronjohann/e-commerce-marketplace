import React, { Component } from "react";
import Logo from "./Logo.jsx";
import Search from "./Search.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Cart from "./Cart.jsx";
import Banner from "./Banner.jsx";

class Header extends Component {
  render = () => {
    return (
      <div>
        <Logo />
        <Search />
        <Login />
        <Signup />
        <Cart />
        <div>
          <Banner />
        </div>
      </div>
    );
  };
}

export default Header;
