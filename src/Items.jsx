import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";

class Items extends Component {
  render = () => {
    return (
      <div>
        {this.props.items.map(r => {
          return (
            <div>
              <img src={r.images[0]} />
              {r.title}${r.price}
            </div>
          );
        })}
      </div>
    );
  };
}

export default Items;
