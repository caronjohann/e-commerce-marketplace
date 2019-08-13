import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
// import { connect } from "react-redux"
<<<<<<< HEAD
// import Login from "./Login.jsx";
// import Signup from "./Signup.jsx";
// import Search from './Search.jsx'
=======
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
>>>>>>> fb3e919878b6ffd6d29a07f66fae5bda521e02f3
import "./main.css";
import Header from "./Header.jsx";
// import Items from "./Items.jsx";
import NewItems from "./NewItems.jsx";
<<<<<<< HEAD
// import Footer from "./Footer.jsx";
class App extends Component {
  render = () => {
    return (
      <div>
        {/* <Signup /> */}
        {/* <Login /> */}
        {/* <Footer /> */}
        <NewItems />
        {/* <Items /> */}
        {/* <Header /> */}
        {/* <Items /> */}
      </div>
=======
import Footer from "./Footer.jsx";
let renderHomePage = () => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};
let renderSearchPage = () => {
  return (
    <div>
      <Search />
    </div>
  );
};
let renderLoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};
class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderHomePage} />
          <Route exact={true} path="/search" render={renderSearchPage} />
          <Route exact={true} path="/login" render={renderLoginPage} />
        </div>
      </BrowserRouter>
>>>>>>> fb3e919878b6ffd6d29a07f66fae5bda521e02f3
    );
  };
}

export default App;
