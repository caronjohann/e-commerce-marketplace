import React, { Component } from "react";
<<<<<<< HEAD
import { connect } from "react-redux" 
import Login from './Login.jsx' 
import Signup from './Signup.jsx' 
import Search from './Search.jsx' 
import './main.css'
=======
import Header from "./Header.jsx";
import Items from "./Items.jsx";
import Footer from "./Footer.jsx";
>>>>>>> 4d2a8f7a1a782a2f26643ba5ef2964953641a1fd
class App extends Component {
  render = () => {
    return (
      <div>
        <Items />
        <Header />
        <Header />
        <Items />
        <Footer />
      </div>
    );
  };
}

export default App;
