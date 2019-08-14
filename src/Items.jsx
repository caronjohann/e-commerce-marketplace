import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  render = () => {
    return (
      <div className="flex container">
        {this.props.allItems.map(item => {
          return (
            <div>
              <Link to={"/itemDescription/" + item._id}>
                <img src={item.images[0]} />
                {item.title}${item.price}
              </Link>
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
