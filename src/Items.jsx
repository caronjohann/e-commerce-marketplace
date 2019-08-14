import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  render = () => {
    return (
      <div className="flex container">
        <div>
          <Link to="/">All Products</Link>
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
  };
}

let mapStateToProps = st => {
  return { allItems: st.allItems };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
