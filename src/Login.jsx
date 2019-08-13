import React, { Component } from "react";
import { connect } from 'react-redux'
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
    console.log("username", evt.target.value)
    this.setState({ username: evt.target.value })
  }
  handlePassword = evt => {
    console.log("password", evt.target.value)
    this.setState({ password: evt.target.value })
  }
  handleSubmit = async evt => {
    evt.preventDefault()
    console.log("login form submitted")
    let data = new FormData()
    data.append("username", this.state.username)
    data.append("password", this.state.password)
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    })
    let responseBody = await response.text()
    console.log("responseBody form login", responseBody)
    let body = JSON.parse(responseBody)
    console.log("parsed body", body)
    if (!body.success) {
      this.setState({ failedLogin: true });
      return
    }
    if (body.success) {
      this.setState({ failedLogin: false })
    }

  }
  render = () => {
    if (this.state.failedLogin) {
      return (<div>
        <h2>Login failed</h2>
      </div>)
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          username <input type="text" onChange={this.handleUsername} />
          password <input type="text" onChange={this.handlePassword} />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin)
export default Login

