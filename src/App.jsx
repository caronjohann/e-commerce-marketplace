import React, { Component } from "react";
// import { connect } from "react-redux"
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
// import Search from './Search.jsx'
import "./main.css";
// import Header from "./Header.jsx";
// import Items from "./Items.jsx";
import Footer from "./Footer.jsx";
class App extends Component {
  render = () => {
    return (
      <div>
        <Signup />
        <Login />
        <Footer />
        {/* {/* <Items />
        <Header />
        <Items />
        */}
      </div>
    );
  };
}

export default App;
