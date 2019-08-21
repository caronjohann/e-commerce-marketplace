import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import Items from "./Items.jsx";
import './signup.css'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      registered: null,
      click: 0
    };
  }

  handleChange = (evt, name) => {
    this.setState({
      [name]: evt.target.value
    });
  };

  nextForm = () => {
    this.setState({ click: this.state.click + 1 })
    return
  }

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
    Swal.fire({
      text: 'Acount created.',
      showConfirmButton: false,
      timer: 1000
    })
  };

  inputForm = () => {
    if (this.state.click === 0) {
      return (
        <div>
          <div className="titleAndInput">
            <div className="loginForm form2">
              <a className="number">1.</a>
              <h3>Please enter your first name</h3>
            </div>
            <input
              type="text"
              onChange={e => this.handleChange(e, "firstName")}
              placeholder="Type your name here"
              value={this.state.firstName}
              className="inputForm form2"
            />
            <button onClick={this.nextForm} className="submitSignup">Next</button>
          </div></div>
      )
    }
    if (this.state.click === 1) {
      return (
        <div>
          <div className="titleAndInput form3">
            <div className="loginForm">
              <a className="number">2.</a>
              <h3>Now, please enter your last name</h3>
            </div>

            <input
              type="text"
              onChange={e => this.handleChange(e, "lastName")}
              placeholder="type your last name here"
              value={this.state.lastName}
              className="inputForm"
            />
            <button onClick={this.nextForm} className="submitSignup">Next</button>
          </div>
        </div>)
    }
    if (this.state.click === 2) {
      return (
        <div className="titleAndInput form4">
          <div className="loginForm">
            <a className="number">3.</a>
            <h3>We will also need your email address</h3>
          </div>
          <input type="email" onChange={e => this.handleChange(e, "username")} value={this.state.username} placeholder="Type your email here" className="inputForm" />
          <button onClick={this.nextForm} className="submitSignup">Next</button>
        </div>
      )
    }
    if (this.state.click === 3) {
      return (
        <div>
          <div>
            <div className="titleAndInput form5">
              <div className="loginForm">
                <a className="number">4.</a>
                <h3>Now, please choose a secure password</h3>
              </div>
              <input
                type="password"
                onChange={e => this.handleChange(e, "password")}
                value={this.state.password}
                placeholder="Type your password here"
                className="inputForm"
              />
            </div>
          </div>
          <div className="form6">
            <div>
              <input type="checkbox" id="newsletter" name="newsletter" />
              <label for="scales">
                Sign me up for emails to get exclusive offers
              </label>
            </div>
            <input type="submit" value="Register" className="submitSignup" />
          </div>
        </div>
      )
    }
  }
  render = () => {

    if (this.state.registered === true) {
      return (
        <div>
          <Items />
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
        <div className="main">
          <form onSubmit={this.submitHandler}>
            <h2 className="signupForms form">Create your account</h2>
            <div className="signupForms">
              {this.inputForm()}
            </div>
            <div className="link linkSignup">
              <Link to="/"><span className='arrow'>←</span>Return to marketplace</Link>
            </div>
          </form>
        </div>
      );
    }
  };
}

export default Signup;
