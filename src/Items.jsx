import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allItems);
    this.state = {
      category: "All Products",
      count: null,
      showMoreClicks: 1
    };
  }

  handleWomens = evt => {
    console.log("clicked womens");
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Womens";
    });
    this.setState({
      category: "Womens",
      showMoreClicks: 1,
      count: newCount.length
    });
  };

  handleMens = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Mens";
    });
    this.setState({
      category: "Mens",
      showMoreClicks: 1,
      count: newCount
    });
  };

  handleLifeAndHome = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Life & Home";
    });
    newCount = newCount.length;
    this.setState({
      category: "Life & Home",
      showMoreClicks: 1,
      count: newCount
    });
  };

  handleAll = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.length;
    this.setState({
      category: "All Products",
      showMoreClicks: 1,
      count: newCount
    });
  };

  handleShowMore = () => {
    if (12 * this.state.showMoreClicks > this.props.allItems) {
      return;
    }
    this.setState({ showMoreClicks: this.state.showMoreClicks + 1 });
  };

  render = () => {
    console.log(this.props.allItems);
    let toDisplayItems = this.props.allItems;
    let amountOfItems = 0
    if (this.state.category === "All Products") {
      amountOfItems = this.props.allItems.length;
    } else {
      let cat = this.props.allItems.filter(cat => {
        return cat.category === this.state.category
      })
      amountOfItems = cat.length
    }
    let starterItems = 12;
    if (this.state.category !== "All Products")
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
            <h2 className="logo-text">Trade Market</h2>
            <h2 className="margin-bottom-20">
              An online collection of user stores for buying and selling curated
              products.
            </h2>
            {/* <div>
              <Link to="/signup" className="sign-up-btn">
                Signup
              </Link>
            </div> */}
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
              <a className="category-btn" onClick={this.handleLifeAndHome}>
                Life & Home <span className="cat-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container cat-text">
          {this.state.category} ({amountOfItems})
        </div>
        <div className="container item-cont">
          {toDisplayItems.map(item => {
            return (
              <div className="item">
                <div className="img-obj">
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.images[0]} width="200px" />
                  </Link>
                </div>
                <div className="item-descrip">
                  <Link to={"/itemDescription/" + item._id}>{item.title}</Link>
                </div>
                <div className="small-item-price">${item.price}</div>
              </div>
            );
          })}
        </div>
        <div className="container show-more">
          <div className="down-arrow">
            <a>↓</a>
          </div>
          <div>
            <a onClick={this.handleShowMore}>Show more</a>
          </div>
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
