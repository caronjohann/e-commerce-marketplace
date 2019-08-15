import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class UnconnectedItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemClicked: 0,
      cartList: []
    };
  }
  imageClickHander = index => {
    this.setState({ currentItemClicked: index });
  };
  handleClick = () => {
    let addToCartItem = event.target.value;
    cartList.push(addToCartItem);
  };
  render = () => {
    return (
      <div className="flex container">
        <div>
          <div>
            <img
              src={this.props.item.images[this.state.currentItemClicked]}
              height="200px"
            />
          </div>
          <div className="flex container">
            {this.props.item.images.map((each, index) => {
              return (
                <img
                  src={each}
                  onClick={() => {
                    this.imageClickHander(index);
                  }}
                  height="100px"
                />
              );
            })}
          </div>
        </div>
        <div>
          <div> {this.props.item.title}</div>
          <div> {this.props.item.description}</div>
          <div> {this.props.item.price}</div>
          <button onClick={this.handleClick}> Add to cart </button>
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return { allItems: st.allItems, cartList: st.cartList };
};
let connectedItemDescription = connect(mapStateToProps)(
  UnconnectedItemDescription
);

export default connectedItemDescription;
