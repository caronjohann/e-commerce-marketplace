import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
        cartLength: body2.cartLength
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
        <div className="flex container">
          <div>
            <form onSubmit={this.handleSubmit}>
              <h2>Login to your account</h2>
              <h3>Email Address</h3>
              <input type="email" onChange={this.handleUsername} />
              <h3>Password</h3>
              <input type="password" onChange={this.handlePassword} />
              <input type="submit" value="Log In" />
            </form>
          </div>
          <div>
            <h2>
              <Link to="/signup">Create new account</Link>
            </h2>
            <h3>Register an account account to sell and </h3>
            <Link to="/">Return to marketplace</Link>
          </div>
        </div>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
