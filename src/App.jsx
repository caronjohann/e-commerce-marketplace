import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";
import "./main.css";
import Header from "./Header.jsx";
import Items from "./Items.jsx";
import ItemDescription from "./ItemDescription.jsx";
import NewItems from "./NewItems.jsx";
import Cart from "./Cart.jsx";
import Footer from "./Footer.jsx";
import Sellerpage from "./Sellerpage.jsx";

class App extends Component {
  renderHomePage = () => {
    return (
      <div>
        <Items />
      </div>
    );
  };

  renderSearchPage = () => {
    return (
      <div>
        <div>
          <Search />
        </div>

        <div>
          <SearchResults />
        </div>
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
  renderSignupPage = () => {
    return (
      <div>
        <Signup />
      </div>
    );
  };

  renderItemDescriptionPage = routerData => {
    let itemId = routerData.match.params._id;
    let item = this.props.allItems.filter(item => {
      return item._id === itemId;
    })[0];
    return <div>{<ItemDescription item={item} />}</div>;
  };
  renderSellerPage = routerData => {
    let seller = this.props.sellerClicked;
    let items = this.props.allItems.filter(item => {
      return item.seller === seller;
    });
    console.log(items, "checking items");
    return <div>{<Sellerpage items={items} />}</div>;
  };

  renderCartPage = () => {
    return <Cart />;
  };
  renderListingPage = () => {
    return (
      <div>
        <NewItems />
      </div>
    );
  };
  componentDidMount = async () => {
    // fetching all items from /send-items endpoint
    let response = await fetch("/send-items");
    let body = await response.text();
    body = JSON.parse(body);
    this.props.dispatch({
      type: "all-items",
      allItems: body
    });
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact={true} path="/" render={this.renderHomePage} />
          <Route exact={true} path="/search" render={this.renderSearchPage} />
          <Route exact={true} path="/login" render={this.renderLoginPage} />
          <Route exact={true} path="/signup" render={this.renderSignupPage} />

          <Route
            exact={true}
            path="/seller/:_id"
            render={this.renderSellerPage}
          />

          <Route
            exact={true}
            path="/new-listing"
            render={this.renderListingPage}
          />
          <Route
            exact={true}
            path="/shopping-cart"
            render={this.renderCartPage}
          />
          <Route
            exact={true}
            path="/itemDescription/:_id"
            render={this.renderItemDescriptionPage}
          />
          <Footer />
        </div>
      </BrowserRouter>
      // <div><NewItems /></div>
    );
  };
}

let mapStateToProps = st => {
  return {
    allItems: st.allItems,
    sid: st.sessionId,
    sellerClicked: st.sellerClicked
  };
};

let connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
