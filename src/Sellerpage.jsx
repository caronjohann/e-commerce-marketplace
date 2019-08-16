import React, { Component } from "react";
import { connect } from "react-redux";
class Sellerpage extends Component {
  render = () => {
    return (
      <div>
        <h1>{this.props.items[0].seller} Items For Sale</h1>
        <div>
          {this.props.items.map(item => {
            return (
              <div>
                <div>
                  <img src={item.images[0]} />
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

export default Sellerpage;
