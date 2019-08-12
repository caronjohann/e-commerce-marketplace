import React, { Component } from "react";

class Signup extends Component {
  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <h2>Register</h2>
          <h3>First Name</h3>
          <input type="text" onChange={this.firstNameHandler} />
          <h3>Last Name</h3>
          <input type="text" onChange={this.lastNameHandler} />
          <h3>Email Address</h3>
          <input type="email" onChange={this.emailHandler} />
          <h3>Password</h3>
          <input type="password" onChange={this.passwordHandler} />
          <input type="checkbox" id="newsletter" name="newsletter" checked />
          <label for="scales">
            Sign me up for emails to get exclusive offers
          </label>
          <input type="submit" value="Register" />
          <p>Or return to store</p>
        </form>
      </div>
    );
  };
}

export default Signup;
