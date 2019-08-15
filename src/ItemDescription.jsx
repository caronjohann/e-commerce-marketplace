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
  imageClickHander = index => {
    this.setState({ currentItemClicked: index });
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
          <Link to={"/shopping-cart/"}>Add to cart</Link>
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
