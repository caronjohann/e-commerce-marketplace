import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
// import { connect } from "react-redux"
// import Login from "./Login.jsx";
// import Signup from "./Signup.jsx";
// import Search from './Search.jsx'
import "./main.css";
import Header from "./Header.jsx";
// import Items from "./Items.jsx";
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
  constructor(props){
    super(props)
    this.state={
      allItems:[]
    }
  };
  
  render = () => {
    renderItems = () =>{
      let response= await fetch("/send-items");
      let body= await response.text();
      console.log("send-items",body);
      body =JSON.parse(body);
      this.setState({allItems:body});
    };
    setInterval(renderItems, 500)      
    
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

export default App;
