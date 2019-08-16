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
    console.log(toDisplayItems.length);
    return (
      <div>
        <div className="flex container">
          <div>
            <form onSubmit={this.handleAll}>
              <input type="submit" value="All Products" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleWomens}>
              <input type="submit" value="Women" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleMens}>
              <input type="submit" value=" Mens" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleAccessories}>
              <input type="submit" value=" Accessories" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleOther}>
              <input type="submit" value=" Other" />
            </form>
          </div>
        </div>
        <div className="flex container item-cont">
          {toDisplayItems.map(item => {
            return (
              <div className="item">
                <div>
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.images[0]} height="200px" />
                  </Link>
                </div>
                <div>
                  <Link to={"/itemDescription/" + item._id}>{item.title}</Link>
                </div>
                <div>${item.price}</div>
                <div>
                  <Link to={"/shopping-cart"}>Add to cart</Link>
                </div>
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
