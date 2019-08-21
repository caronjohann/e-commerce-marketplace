import React, { Component } from "react";
import { connect } from "react-redux";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import "./newItems.css"
import './signup.css'
class UnconnectedNewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      image: [],
      categories: "Mens",
      addToItems: null,
      click: 0
    };
  }

  handleChange = (event, name) => {
    if (name === "image") {
      this.setState({
        [name]: event.target.files
      });
    } else {
      this.setState({
        [name]: event.target.value
      });
    }
  };

  nextForm = evt => {
    evt.preventDefault()
    this.setState({ click: this.state.click + 1 })
    return false
  }
  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("fName", this.props.firstName)
    data.append('lName', this.props.lastName)
    for (let i = 0; i < this.state.image.length; i++) {
      data.append("image", this.state.image[i]);
    }
    data.append("categories", this.state.categories);
    let response = await fetch("/newItem", {
      method: "POST",
      body: data,
      credentials: "include"
    });

    let responseBody = await response.text();
    console.log("responseBody form signup", responseBody);
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ addToItems: false });
      Swal.fire({
        text: 'Something went wrong!',
        timer: 1500,
        showConfirmButton: false,
      })
      return;
    }
    console.log("parsed body", body);
    this.setState({ addToItems: true, item: body.item });
    Swal.fire({
      text: 'Item added successfully.',
      showConfirmButton: false,
      timer: 1000
    })

  };

  inputForm = () => {
    if (this.state.click === 0) {
      return (
        <div>
          <div className="titleAndInput formNI">
            <div className="loginForm">
              <a className="number">1.</a>
              <h3>What are you selling?</h3>
            </div>
            <input
              type="text"
              className="inputForm"
              onChange={e => this.handleChange(e, "title")}
              placeholder="Type your item title here"
            />
            <button onClick={this.nextForm} className="submitSignup">Next</button>
          </div>
        </div>
      )
    }
    if (this.state.click === 1) {
      return (
        <div className="titleAndInput formNI2">
          <div className="loginForm">
            <a className="number">2.</a>
            <h3>We will also need you to describe your item</h3>
          </div>
          <textarea
            type="email"
            onChange={e => this.handleChange(e, "description")}
            style={{ overflow: "hidden", height: '100px' }}
            value={this.state.description}
            placeholder="Type your description here"
            className="inputForm" />
          <button onClick={this.nextForm} className="submitSignup">Next</button>
        </div>
      )
    }
    if (this.state.click === 2) {
      return (
        <div>
          <div className="titleAndInput formNI3">
            <div className="loginForm">
              <a className="number">3.</a>
              <h3>How much are you asking for?</h3>
            </div>
            <input
              type="number"
              min="0"
              onChange={e => this.handleChange(e, "price")}
              className="inputForm"
              placeholder="Type your price here"
            />
            <button onClick={this.nextForm} className="submitSignup">Next</button>
          </div>
        </div>
      )
    }
    if (this.state.click === 3) {
      return (
        <div className="titleAndInput formNI4">
          <div className="loginForm">
            <a className="number">4.</a>
            <h3>We will need up to 5 images</h3>
          </div>
          <label className="choseFile">
            Select images ({this.state.image.length})
            <input type="file" name="image" onChange={e => this.handleChange(e, "image")} multiple value={this.state.username} className="inputForm" />
          </label>
          <button onClick={this.nextForm} className="submitSignup">Next</button>
        </div>
      )
    }

    if (this.state.click === 4) {
      return (
        <div>
          <div className="titleAndInput formNI5">
            <div className="loginForm">
              <a className="number">5.</a>
              <h3>Select your item category</h3>
            </div>
            <select
              name="categoriesList"
              form="newItem"
              onChange={e => this.handleChange(e, "categories")}
              className="inputForm"
            >
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Life &amp; Home">Life & Home</option>
            </select>
            <div>
              <input
                type="submit"
                value="Add to Items"
                onClick={this.submitHandler}
                className="submitSignup"
              />
            </div>
          </div>
        </div>
      )
    }
  }

  render = () => {
    if (this.state.addToItems === true) {
      return (
        <div>
          <ItemDescription item={this.state.item} />
        </div>
      );
    } else {
      return (
        <div className="main">
          <form id="newItem" encType="multipart/form-data">
            <h2 className="signupForms form">Create new listing</h2>
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
let mapStateToProps = storeState => {
  return {
    username: storeState.username,
    firstName: storeState.firstName,
    lastName: storeState.lastName,
    allItems: storeState.allItems
  };
};
let NewItems = connect(mapStateToProps)(UnconnectedNewItems)
export default NewItems;
