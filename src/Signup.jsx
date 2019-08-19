import React, { Component } from "react";
import { Link } from "react-router-dom";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      registered: null
    };
  }

  handleChange = (evt, name) => {
    console.log(evt.target.value)
    this.setState({
      [name]: evt.target.value
    });
  };

  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody form signup", responseBody);
    let body = JSON.parse(responseBody);
    if (body.success === false) {
      this.setState({ registered: false });
      return;
    }
    console.log("parsed body", body);
    this.setState({ registered: true });
  };
  render = () => {
    if (this.state.registered === true) {
      return (
        <div>
          <h2>
            Your account has been created! <a>Return to marketplace</a>
          </h2>
        </div>
      );
    } else if (this.state.registered === false) {
      return (
        <div>
          <h2>Sorry this email address already exists.</h2>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.submitHandler}>
            <h2>Register</h2>
            <h3>First Name</h3>
            <input
              type="text"
              onChange={e => this.handleChange(e, "firstName")}
            />
            <h3>Last Name</h3>
            <input
              type="text"
              onChange={e => this.handleChange(e, "lastName")}
            />
            <h3>Email Address</h3>
            <input type="email" onChange={e => this.handleChange(e, "username")} />
            <h3>Password</h3>
            <input
              type="password"
              onChange={e => this.handleChange(e, "password")}
            />
            <div>
              <input type="checkbox" id="newsletter" name="newsletter" />
              <label for="scales">
                Sign me up for emails to get exclusive offers
              </label>
            </div>
            <input type="submit" value="Register" />
            <Link to="/">Or return to marketplace</Link>
          </form>
        </div>
      );
    }
  };
}

export default Signup;
