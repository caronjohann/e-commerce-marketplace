import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class SellerPage extends Component {
  render = () => {
    return (
      <div>
        <h1>{this.props.items[0].seller} Items For Sale</h1>
        <div>
          {this.props.items.map(item => {
            return (
              <div>
                <div>
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.images[0]} height="300px" width="300px" />
                  </Link>
                </div>
                <div>{item.title}</div>
                <div>{item.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default SellerPage;
