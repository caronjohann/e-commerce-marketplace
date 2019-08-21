import React, { Component } from "react";
import { connect } from "react-redux";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import './signup.css'
class UnconnectedNewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      image: [],
      categories: "mens",
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
      text: 'Item added successfully.!',
      showConfirmButton: false,
      timer: 1000
    })

  };

  inputForm = () => {
    if (this.state.click === 0) {
      return (
        <div className="titleAndInput form2">
          <div className="loginForm">
            <a className="number">1.</a>
            <h3>Title</h3>
          </div>
          <input type="text" className="inputForm form2" onChange={e => this.handleChange(e, "title")} />
        </div>
      )
    }
    if (this.state.click === 1) {
      return (
        <div className="titleAndInput form3">
          <div className="loginForm ">
            <a className="number">2.</a>
            <h3>Description </h3>
          </div>
          <textarea
            onChange={e => this.handleChange(e, "description")}
            className="inputForm"
            style={{ overflow: "hidden", height: '100px' }}
          />
        </div>
      )
    }
    if (this.state.click === 2) {
      return (
        <div className="titleAndInput form4">
          <div className="loginForm">
            <a className="number">3.</a>
            <h3>Price</h3>
          </div>
          <input
            type="number"
            min="0"
            onChange={e => this.handleChange(e, "price")}
            className="inputForm"
          />
        </div>
      )
    }
    if (this.state.click === 3) {
      return (
        <div className="titleAndInput form5">
          <div className="loginForm">
            <a className="number">4.</a>
            <h3>Choose Images</h3>
          </div>
          <label className="choseFile">
            Select images ({this.state.image.length})
            <input
              type="file"
              name="image"
              onChange={e => this.handleChange(e, "image")}
              multiple
            />
          </label>
        </div>
      )
    }
    if (this.state.click === 4) {
      return (
        <div className="titleAndInput form5">
          <div className="loginForm">
            <a className="number">5.</a>
            <h3>Select Categories</h3>
          </div>
          <select
            name="categoriesList"
            form="newItem"
            onChange={e => this.handleChange(e, "categories")}
            className="inputForm"
          >
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="lifeAndHome">Life & Home</option>
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
    } else if (this.state.click === 4) {
      return (
        <div className="main">
          <form id="newItem" encType="multipart/form-data">
            <div className="signupForms">
              <div>{this.inputForm()}</div>
            </div>
            <div className="link linkSignup">
              <Link to="/"><span className='arrow'>←</span>Return to marketplace</Link>
            </div>
          </form>
        </div>
      );
    }
    else {
      return (
        <div className="main">
          <form id="newItem" encType="multipart/form-data">
            <div className="signupForms">
              <div>{this.inputForm()}</div>
              <button onClick={this.nextForm} className="submitSignup">Next</button>
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
