import React, { Component } from "react";

class Header extends Component {
  render = () => {
    if (this.props.loggedIn) {
    }
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
