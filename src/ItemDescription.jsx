import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItemDescription extends Component {
  render = () => {
    return (
      <div>
        <div>
          {" "}
          <img src={this.props.item.images[0]} height="100px" />
        </div>
        {this.props.item.images.map(each => {
          return <img src={each} height="50px" />;
        })}
        <div> {this.props.item.title}</div>
        <div> {this.props.item.description}</div>
        <div> {this.props.item.price}</div>
        <Link to={"/cart/" + this.props.item._id}>Add to cart</Link>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return { allItems: st.allItems };
};
let connectedItemDescription = connect(mapStateToProps)(
  UnconnectedItemDescription
);

export default connectedItemDescription;
