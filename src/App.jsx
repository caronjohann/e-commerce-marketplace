import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { connect } from "react-redux"
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import "./main.css";
import Header from "./Header.jsx";
import Items from "./Items.jsx";
import NewItems from "./NewItems.jsx";
import Footer from "./Footer.jsx";
let renderHomePage = () => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};
let renderSearchPage = async () => {
  let collection = ['Mens', 'Womens', 'accesseries', 'Other']
  let data = new FormData
  let allItems = []
  for (let i = 0; i < collection.length; i++) {
    let col = collection[i]
    data.append('categorie', col)
    let response = await fetch('/itemSearch', {
      method: "POST",
      body: data
    })
    let body = await response.text()
    console.log(body, "item search")
    body = JSON.parse(body)
    allItems.push(body)
    console.log(allItems, "all Items")
  }

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
  componentDidMount = async () => {
    let collection = ['Mens', 'Womens', 'accesseries', 'Other']
    let data = new FormData
    let allItems = []
    for (let i = 0; i < collection.length; i++) {
      let col = collection[i]
      data.append('categorie', col)
      let response = await fetch('/send-items', {
        method: "POST",
        body: data
      })
      let body = await response.text()
      console.log(body, "item search")
      body = JSON.parse(body)
      allItems.push(body)
      console.log(allItems, "all Items")
    }
    this.props.dispatch({
      type: "all-items",
      allItems: allItems
    });
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderHomePage} />
          <Route exact={true} path="/search" render={renderSearchPage} />
          <Route exact={true} path="/login" render={renderLoginPage} />
        </div>
      </BrowserRouter>
    );
  };
}

let connectedApp = connect()(App);
export default connectedApp;
