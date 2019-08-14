import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all"
    };
  }
  handleWomens = evt => {
    console.log("clicked All", evt.target.value);
    let category = evt.target.value;
    this.setState(this.state.category);
  };
  handleMens = evt => {
    console.log("clicked Mens", evt.target.value);

    this.setState(this.state.category);
  };

  render = () => {
    // this.props.allItems
    //   .filer(item => {
    //     return item.category === this.state.category;
    //   })
    //   .map(item => {});
    if (this.state.category === "all") {
      return (
        <div className="flex container">
          <div>
            <input
              type="submit"
              name="category"
              value={this.state.category}
              onChange={this.handleAll}
            >
              Womens
            </input>
          </div>
          <div>
            <input
              type="submit"
              name="category"
              value={this.state.category}
              onChange={this.handleMens}
            >
              Mens
            </input>
          </div>

          {this.props.allItems.map(item => {
            return (
              <div>
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
      );
    } else if (this.state.category === "mens") {
    } else if (this.category === "womens") {
    } else if (this.category === "other") {
    }
  };
}

let mapStateToProps = st => {
  return { allItems: st.allItems };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
