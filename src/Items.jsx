import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allItems);
    this.state = {
      category: undefined
    };
  }

  handleWomens = evt => {
    console.log("clicked womens");
    evt.preventDefault();
    this.setState({ category: "womens" });
  };

  handleMens = evt => {
    evt.preventDefault();
    this.setState({ category: "mens" });
  };

  handleAccessories = evt => {
    evt.preventDefault();
    this.setState({ category: "accessories" });
  };

  handleOther = evt => {
    evt.preventDefault();
    this.setState({ category: "other" });
  };

  handleAll = evt => {
    evt.preventDefault();
    this.setState({ category: undefined });
  };

  render = () => {
    let toDisplayItems = this.props.allItems;
    if (this.state.category !== undefined)
      toDisplayItems = this.props.allItems.filter(item => {
        return item.category === this.state.category;
      });
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
                  <Link to={"/itemDescription/" + item._id}>
                    {item.title}
                    {<img src="/upload/13-512.png" width="10px" />}
                  </Link>
                </div>
                <div>${item.price}</div>
              </div>
            );
          })}
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
