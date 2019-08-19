import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemClicked: 0
    };
  }
  imageClickHandler = index => {
    this.setState({ currentItemClicked: index });
  };

  handleClick = async () => {
    let data = new FormData();
    data.append("id", this.props.item._id);
    let response = await fetch("/addToCart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    this.props.dispatch({ type: "addCartItems", addToCartItems: body });
  };

  handleSellerClicked = () => {
    this.props.dispatch({
      type: "seller-clicked",
      sellerClicked: this.props.item.seller
    });
  };

  render = () => {
    let toDisplayItems = this.props.allItems;
    toDisplayItems = toDisplayItems.filter(item => {
      if (
        item.category === this.props.item.category &&
        item.title !== this.props.item.title
      ) {
        console.log(item.category);
        return item;
      }
    });
    if (toDisplayItems.length > 6) {
      toDisplayItems = toDisplayItems.slice(0, 5);
    }
    return (
      <div className="itemDesc">
        <div className="flex container">
          <div className="flex container">
            <div>
              {this.props.item.images.map((each, index) => {
                return (
                  <div className="flex container column">
                    <img
                      src={each}
                      onClick={() => {
                        this.imageClickHandler(index);
                      }}
                      height="100px"
                    />
                  </div>
                );
              })}
            </div>
            <div>
              <img
                src={this.props.item.images[this.state.currentItemClicked]}
                height="500px"
              />
            </div>
          </div>
          <div className="description">
            <div className="item-title"> {this.props.item.title}</div>
            <div className="item-price">$ {this.props.item.price} CAD </div>
            {"  "}
            {"  "}
            <div className="item-descript"> {this.props.item.description}</div>
            <div className="item-seller">
              <Link
                to={"/seller/" + this.props.item.seller}
                onClick={this.handleSellerClicked}
              >
                {this.props.item.seller}
              </Link>
            </div>
            <button className="addTocartbutton" onClick={this.handleClick}>
              {" "}
              Add to cart{" "}
            </button>
          </div>
        </div>
        <div className="suggestion">
          <a>Suggestion</a>
          <div className="itemSugg">
            {toDisplayItems.map(item => {
              return (
                <div className="item">
                  <div>
                    <Link to={"/itemDescription/" + item._id}>
                      <img src={item.images[0]} height="200px" width="200px" />
                    </Link>
                  </div>
                  <div>
                    <Link to={"/itemDescription/" + item._id}>
                      {item.title}
                    </Link>
                  </div>
                  <div>${item.price}</div>
                </div>
              );
            })}
          </div>
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
