import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import "./main.css";
import Header from "./Header.jsx";
import Items from "./Items.jsx";
import NewItems from "./NewItems.jsx";
import Footer from "./Footer.jsx";
class App extends Component {
  renderHomePage = () => {
    return (
      <div>
        <Header />

        <Items items={this.props.allItems} />

        <Footer />
      </div>
    );
  };
  renderSearchPage = allItems => {
    return () => (
      <div>
        <Search items={this.props.allItems} />
      </div>
    );
  };
  renderLoginPage = () => {
    return (
      <div>
        <Login />
      </div>
    );
  };
  componentDidMount = async () => {
    let collection = ["Mens", "Womens", "accesseries", "Other"];
    let data = new FormData();
    let allItems = [];
    for (let i = 0; i < collection.length; i++) {
      let col = collection[i];
      data.append("categorie", col);
      let response = await fetch("/send-items", {
        method: "POST",
        body: data
      });
      let body = await response.text();
      console.log(body, "item search");
      body = JSON.parse(body);
      allItems.push(body);
      console.log(allItems, "all Items");
    }
    this.props.dispatch({
      type: "all-items",
      allItems: body
    });
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderHomePage} />
          <Route exact={true} path="/search" render={this.renderSearchPage} />
          <Route exact={true} path="/login" render={this.renderLoginPage} />
        </div>
      </BrowserRouter>
    );
  };
}
let mapStateToProps = st => {
  return { allItems: st.allItems };
};
let connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
