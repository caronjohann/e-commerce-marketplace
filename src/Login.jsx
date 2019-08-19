import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Login.css"
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failedLogin: false
    };
  }
  handleUsername = evt => {
    console.log("username", evt.target.value);
    this.setState({ username: evt.target.value });
  };
  handlePassword = evt => {
    console.log("password", evt.target.value);
    this.setState({ password: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody form login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      this.props.dispatch({
        type: "username",
        username: ""
      });
      this.setState({ failedLogin: true });
      return;
    }
    let response2 = await fetch("/update-cart", {
      method: "POST",
      credentials: "include"
    })
    let responseBody2 = await response2.text();
    let body2 = JSON.parse(responseBody2);
    console.log("parsed body", body2);
    if (body.success) {
      console.log(body2, "body")
      this.props.dispatch({
        type: "username",
        username: body.username,
        sid: body.sid,
        firstName: body.fName,
        lastName: body.lName,
        cartLength: body2.cartLength,
        cart: body2.cart
      })
      this.setState({ failedLogin: false });
    }
  };
  render = () => {
    if (this.state.failedLogin) {
      return (
        <div>
          <h2>Login failed, please try again</h2>
        </div>
      );
    }

    return (
      <div>
        <div className="loginFlex loginContainer container flex">
          <div className="login">
            <form onSubmit={this.handleSubmit}>
              <div className="loginForm">
                <a className="number">1.</a>
                <h3>Could you tell us your username?</h3>
              </div>
              <input type="email" onChange={this.handleUsername} placeholder="Type your username here." className="inputForm" />
              <div className="loginForm">
                <a className="number">2.</a>
                <h3>We will also need your password</h3>
              </div>
              <div>
                <input type="password" onChange={this.handlePassword} placeholder="Type your password here." className="inputForm" />
              </div>
              <input type="submit" value="Login" className="submitLogin" />
            </form>
          </div>
          <div className="signup">
            <h2>
              <Link to="/signup" className="signupLink">Create new account</Link>
            </h2>
            <div className="regText">Register an account account to sell and </div>
            <div className="link">
              <Link to="/" ><span className='arrow'>←</span> Return to marketplace</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
