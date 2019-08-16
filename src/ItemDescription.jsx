import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

class UnconnectedItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemClicked: 0
    };
  }
  imageClickHander = index => {
    this.setState({ currentItemClicked: index });
  };

  handleClick = async () => {
    let data = new FormData();
    console.log(this.props.item._id);
    data.append("id", this.props.item._id);
    let response = await fetch("/addTocart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body, "body");
    this.props.dispatch({ type: "addTocart", addTocartItems: body });
  };

  handleSellerClicked = () => {
    this.props.dispatch({
      type: "seller-clicked",
      sellerClicked: this.props.item.seller
    });
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
          <div>${this.props.item.price}</div>
          <div>
            <Link
              to={"/seller/" + this.props.item.seller}
              onClick={this.handleSellerClicked}
            >
              {this.props.item.seller}
            </Link>
          </div>
          <button onClick={this.handleClick}> Add to cart </button>
        </div>
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
