import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allItems);
    this.state = {
      category: undefined,
      showMoreClicks: 1
    };
  }

  handleWomens = evt => {
    console.log("clicked womens");
    evt.preventDefault();
    this.setState({ category: "womens", showMoreClicks: 1 });
  };

  handleMens = evt => {
    evt.preventDefault();
    this.setState({ category: "mens", showMoreClicks: 1 });
  };

  handleAccessories = evt => {
    evt.preventDefault();
    this.setState({ category: "accessories", showMoreClicks: 1 });
  };

  handleOther = evt => {
    evt.preventDefault();
    this.setState({ category: "other", showMoreClicks: 1 });
  };

  handleAll = evt => {
    evt.preventDefault();
    this.setState({ category: undefined, showMoreClicks: 1 });
  };

  handleShowMore = () => {
    if (12 * this.state.showMoreClicks > this.props.allItems) {
      return;
    }
    this.setState({ showMoreClicks: this.state.showMoreClicks + 1 });
  };

  render = () => {
    let toDisplayItems = this.props.allItems;

    let starterItems = 12;
    if (this.state.category !== undefined)
      toDisplayItems = this.props.allItems.filter(item => {
        return item.category === this.state.category;
      });
    if (toDisplayItems.length > 12) {
      toDisplayItems = toDisplayItems.slice(
        0,
        starterItems * this.state.showMoreClicks
      );
    }
    return (
      <div>
        <div className="hero container">
          <div className="hero-text">
            <h2>
              <img src="assets/logo.svg" width="450px" />
            </h2>
            <h2 className="margin-bottom-20">
              – An online collection of user stores for buying and selling
              curated products.
            </h2>
            <div>
              <Link to="/signup" className="sign-up-btn">
                Signup
              </Link>
            </div>
          </div>
        </div>
        <div className="flex container cat-btns">
          <div>
            <a className="category-btn" onClick={this.handleAll}>
              All Products <span className="cat-arrow">↗</span>
            </a>
          </div>
          <div>
            <div>
              <a className="category-btn" onClick={this.handleWomens}>
                Womens <span className="cat-arrow">↗</span>
              </a>
            </div>
          </div>
          <div>
            <div>
              <a className="category-btn" onClick={this.handleMens}>
                Mens <span className="cat-arrow">↗</span>
              </a>
            </div>
          </div>
          <div>
            <div>
              <a className="category-btn" onClick={this.handleAccessories}>
                Life & Home <span className="cat-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex container item-cont">
          {toDisplayItems.map(item => {
            return (
              <div className="item">
                <div>
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.images[0]} height="200px" width="200px" />
                  </Link>
                </div>
                <div>
                  <Link to={"/itemDescription/" + item._id}>{item.title}</Link>
                </div>
                <div>${item.price}</div>
              </div>
            );
          })}
        </div>
        <div className="container">
          <button onClick={this.handleShowMore}>Show more</button>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { allItems: st.allItems };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
