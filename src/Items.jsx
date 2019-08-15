import { connect } from "react-redux";
import React, { Component } from "react";
import ItemDescription from "./ItemDescription.jsx";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allItems);
    this.state = {
      userWantedItems: this.props.allItems
      //category: "all"
    };
  }

  handleWomens = evt => {
    console.log("clicked womens", evt.target.value);
    evt.preventDefault();
    let userWantedItems = this.props.allItems.filter(item => {
      return item.category === "womens";
    });
    console.log("uuuuu", userWantedItems);
    this.setState({ userWantedItems });
  };

  handleMens = evt => {
    evt.preventDefault();
    let userWantedItems = this.props.allItems.filter(item => {
      return item.category === "mens";
    });
    this.setState({ userWantedItems });
  };

  handleAccessories = evt => {
    evt.preventDefault();
    let userWantedItems = this.props.allItems.filter(item => {
      return item.category === "accessories";
    });
    this.setState({ userWantedItems });
  };
  handleAll = evt => {
    evt.preventDefault();
    let userWantedItems = this.props.allItems;
    this.setState({ userWantedItems });
  };

  render = () => {
    // this.props.allItems
    //   .filer(item => {
    //     return item.category === this.state.category;
    //   })
    //   .map(item => {});
    // if (this.state.category === "all") {
    return (
      <div className="flex container">
        <div>
          <form onSubmit={this.handleAll}>
            <input
              type="submit"
              // name="category"
              // value={this.state.category}

              value="All Products"
            />
          </form>
        </div>
        <div>
          <form onSubmit={this.handleWomens}>
            <input
              type="submit"
              // name="category"
              // value={this.state.category}

              value="Women"
            />
          </form>
        </div>
        <div>
          <form onSubmit={this.handleMens}>
            <input
              type="submit"
              // name="category"
              // value={this.state.category}

              value=" Mens"
            />
          </form>
        </div>
        <div>
          <form onSubmit={this.handleAccessories}>
            <input
              type="submit"
              // name="category"
              // value={this.state.category}

              value=" Accessories"
            />
          </form>
        </div>

        <div>
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

        {this.state.userWantedItems.map(item => {
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
